#!/usr/bin/env node
/**
 * 博客图片就地压缩脚本
 * 递归扫描并优化 src/content/posts, src/assets, public 下的高清图片
 * - 智能等比缩放至最大 1920px 宽度（不放大已有小图）
 * - 采用高质量有损/无损压缩（PNG / JPG / WebP）
 * - 直接就地替换原文件，文件名及文章引用路径保持不变
 * - 自动跳过已优化或微小图片，安全对比体积
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const MIN_SAVINGS_RATIO = 0.95; // 压缩后体积小于原体积的 95% 才进行替换
const SKIP_THRESHOLD_BYTES = 150 * 1024; // 小于 150KB 且分辨率已达标的图片直接跳过

const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const DEFAULT_TARGET_DIRS = [
	path.join(process.cwd(), "src", "content", "posts"),
	path.join(process.cwd(), "src", "assets"),
	path.join(process.cwd(), "public"),
];

function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getAllFiles(dirPath, arrayOfFiles = []) {
	if (!fs.existsSync(dirPath)) return arrayOfFiles;
	const files = fs.readdirSync(dirPath);

	for (const file of files) {
		const fullPath = path.join(dirPath, file);
		if (file.startsWith(".") || file === "node_modules") {
			continue;
		}
		try {
			const stat = fs.statSync(fullPath);
			if (stat.isDirectory()) {
				getAllFiles(fullPath, arrayOfFiles);
			} else {
				const ext = path.extname(file).toLowerCase();
				if (SUPPORTED_EXTENSIONS.has(ext)) {
					arrayOfFiles.push(fullPath);
				}
			}
		} catch {
			// 忽略无权限或已删除的文件
		}
	}
	return arrayOfFiles;
}

async function compressImage(filePath) {
	const ext = path.extname(filePath).toLowerCase();
	const inputBuffer = fs.readFileSync(filePath);
	const originalSize = inputBuffer.length;

	let image = sharp(inputBuffer);
	let metadata;
	try {
		metadata = await image.metadata();
	} catch (err) {
		console.warn(`[跳过] 无法读取图片元数据: ${filePath} (${err.message})`);
		return null;
	}

	const originalWidth = metadata.width || 0;
	const originalHeight = metadata.height || 0;

	// 如果尺寸未超过限制，且文件已经小于 150KB，跳过
	if (
		originalWidth <= MAX_WIDTH &&
		originalHeight <= MAX_HEIGHT &&
		originalSize <= SKIP_THRESHOLD_BYTES
	) {
		return { status: "skipped", reason: "already small" };
	}

	// 等比缩小
	const needsResize =
		originalWidth > MAX_WIDTH || originalHeight > MAX_HEIGHT;
	image = image.resize({
		width: MAX_WIDTH,
		height: MAX_HEIGHT,
		fit: "inside",
		withoutEnlargement: true,
	});

	// 按格式配置压缩参数
	if (ext === ".png") {
		image = image.png({
			quality: 85,
			compressionLevel: 9,
			effort: 7,
		});
	} else if (ext === ".jpg" || ext === ".jpeg") {
		image = image.jpeg({
			quality: 82,
			mozjpeg: true,
		});
	} else if (ext === ".webp") {
		image = image.webp({
			quality: 82,
			effort: 5,
		});
	}

	const compressedBuffer = await image.toBuffer();
	const newSize = compressedBuffer.length;

	// 仅当新体积真正变小且至少节省 5% 时才替换
	if (newSize < originalSize * MIN_SAVINGS_RATIO) {
		fs.writeFileSync(filePath, compressedBuffer);
		return {
			status: "compressed",
			originalSize,
			newSize,
			savedBytes: originalSize - newSize,
			originalDim: `${originalWidth}x${originalHeight}`,
			needsResize,
		};
	}

	return { status: "kept", reason: "no smaller" };
}

async function main() {
	console.log("🔍 开始扫描博客图片...\n");
	const startTime = Date.now();

	const customTargets = process.argv.slice(2);
	const targetDirs =
		customTargets.length > 0
			? customTargets.map((d) => path.resolve(process.cwd(), d))
			: DEFAULT_TARGET_DIRS;

	let allImages = [];
	for (const dir of targetDirs) {
		allImages = allImages.concat(getAllFiles(dir));
	}

	// 去重
	allImages = Array.from(new Set(allImages));

	if (allImages.length === 0) {
		console.log("未找到可压缩的图片文件。");
		return;
	}

	console.log(`共发现 ${allImages.length} 张图片，正在处理中...\n`);

	let compressedCount = 0;
	let totalSavedBytes = 0;
	let totalOriginalBytes = 0;
	let totalNewBytes = 0;

	for (const filePath of allImages) {
		const relPath = path.relative(process.cwd(), filePath);
		try {
			const result = await compressImage(filePath);
			if (result && result.status === "compressed") {
				compressedCount++;
				totalSavedBytes += result.savedBytes;
				totalOriginalBytes += result.originalSize;
				totalNewBytes += result.newSize;

				const percent = (
					(result.savedBytes / result.originalSize) *
					100
				).toFixed(1);
				console.log(
					`✔ ${relPath} (${result.originalDim}${result.needsResize ? " -> 缩减尺寸" : ""})`,
				);
				console.log(
					`   ${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)} (减少 -${percent}%)\n`,
				);
			}
		} catch (err) {
			console.error(`✖ 处理失败: ${relPath} - ${err.message}`);
		}
	}

	const duration = ((Date.now() - startTime) / 1000).toFixed(1);

	console.log("--------------------------------------------------");
	if (compressedCount > 0) {
		const totalPercent = (
			(totalSavedBytes / totalOriginalBytes) *
			100
		).toFixed(1);
		console.log(`🎉 压缩完成！用时 ${duration}s`);
		console.log(`📊 成功优化图片: ${compressedCount} 张`);
		console.log(
			`📉 体积变化: ${formatBytes(totalOriginalBytes)} -> ${formatBytes(totalNewBytes)}`,
		);
		console.log(
			`✨ 累计为站点节省空间: ${formatBytes(totalSavedBytes)} (总降幅 -${totalPercent}%)`,
		);
	} else {
		console.log(
			`👍 所有图片已处于最佳状态（均已小于 150KB 或已优化），无需重复压缩。用时 ${duration}s`,
		);
	}
	console.log("--------------------------------------------------");
}

main().catch((err) => {
	console.error("执行异常:", err);
	process.exit(1);
});
