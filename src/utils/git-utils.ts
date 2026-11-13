import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export interface CommitDay {
	count: number;
	messages: string[];
}

export type CommitsMap = Record<string, CommitDay>;

export interface GitCommitStats {
	commitsByDate: CommitsMap;
	totalCommits: number;
	activeDays: number;
	years: string[];
}

const CACHE_FILE_PATH = path.join(
	process.cwd(),
	"src",
	"assets",
	"git-commits.json",
);

// 站长身份标识（用于在 fork 仓库中过滤出站长自己的提交，排除原主题上游贡献者的提交）
const AUTHOR_IDENTIFIERS = [
	"siesta",
	"1169391936",
	"会做饭的二哈",
	"baikaiwen12",
].filter(Boolean);

function isUserCommit(authorName: string, authorEmail: string): boolean {
	const name = (authorName || "").toLowerCase();
	const email = (authorEmail || "").toLowerCase();
	return AUTHOR_IDENTIFIERS.some(
		(id) => name.includes(id) || email.includes(id),
	);
}

function isShallowRepository(): boolean {
	try {
		const raw = execSync("git rev-parse --is-shallow-repository", {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "ignore"],
		});
		return raw.trim() === "true";
	} catch {
		return false;
	}
}

function readCacheFile(): CommitsMap {
	if (!fs.existsSync(CACHE_FILE_PATH)) {
		return {};
	}
	try {
		const cacheContent = fs.readFileSync(CACHE_FILE_PATH, "utf8");
		const parsed = JSON.parse(cacheContent);
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		return {};
	}
}

function writeCacheFile(commitsByDate: CommitsMap): void {
	try {
		const cacheDir = path.dirname(CACHE_FILE_PATH);
		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}
		const serialized = `${JSON.stringify(commitsByDate, null, "\t")}\n`;
		if (fs.existsSync(CACHE_FILE_PATH)) {
			const existing = fs.readFileSync(CACHE_FILE_PATH, "utf8");
			if (existing === serialized) {
				return;
			}
			try {
				if (
					JSON.stringify(JSON.parse(existing)) === JSON.stringify(commitsByDate)
				) {
					return;
				}
			} catch {
				// 忽略旧缓存解析异常，继续覆盖
			}
		}
		fs.writeFileSync(CACHE_FILE_PATH, serialized, "utf8");
	} catch {
		// 忽略写入缓存失败
	}
}

function parseGitLog(): { commitsByDate: CommitsMap; totalCommits: number } {
	const commitsByDate: CommitsMap = {};
	let totalCommits = 0;

	const raw = execSync('git log --date=short --format="%ad|||%an|||%ae|||%s"', {
		encoding: "utf8",
		stdio: ["pipe", "pipe", "ignore"],
	});

	const lines = raw.trim().split(/\r?\n/).filter(Boolean);
	for (const line of lines) {
		const [date, authorName, authorEmail, ...rest] = line.split("|||");
		const msg = rest.join("|||").trim();
		if (!date) continue;

		// 只统计站长本人的提交，过滤掉上游主题维护者的提交
		if (!isUserCommit(authorName, authorEmail)) {
			continue;
		}

		if (!commitsByDate[date]) {
			commitsByDate[date] = { count: 0, messages: [] };
		}
		commitsByDate[date].count += 1;
		totalCommits += 1;

		// 最多保留最近 5 条详细提交信息用于 Tooltip 展示
		if (commitsByDate[date].messages.length < 5 && msg) {
			commitsByDate[date].messages.push(msg);
		}
	}

	return { commitsByDate, totalCommits };
}

function mergeShallowCommits(
	cached: CommitsMap,
	shallowCommits: CommitsMap,
): CommitsMap {
	const merged: CommitsMap = {};
	for (const [date, info] of Object.entries(cached)) {
		merged[date] = {
			count: info.count,
			messages: [...(info.messages || [])],
		};
	}

	const cachedDates = Object.keys(merged).sort();
	const maxCachedDate = cachedDates[cachedDates.length - 1] || "";

	for (const [date, info] of Object.entries(shallowCommits)) {
		if (date > maxCachedDate) {
			merged[date] = {
				count: info.count,
				messages: [...(info.messages || [])],
			};
		} else if (date === maxCachedDate && merged[date]) {
			for (const msg of info.messages || []) {
				if (msg && !merged[date].messages.includes(msg)) {
					merged[date].count += 1;
					if (merged[date].messages.length < 5) {
						merged[date].messages.unshift(msg);
					}
				}
			}
		}
	}

	return merged;
}

export function getGitCommitHistory(): GitCommitStats {
	let commitsByDate: CommitsMap = {};
	let totalCommits = 0;
	let isShallow = false;

	// 1. 尝试从本地 git log 读取并只保留站长本人的提交
	try {
		isShallow = isShallowRepository();
		const parsed = parseGitLog();
		commitsByDate = parsed.commitsByDate;
		totalCommits = parsed.totalCommits;

		// 仅在完整仓库历史下更新缓存，避免浅克隆 CI 环境覆盖完整历史记录
		if (!isShallow && totalCommits > 0) {
			writeCacheFile(commitsByDate);
		}
	} catch (err) {
		console.warn("[git-utils] 无法直接执行 git log，尝试从本地缓存读取:", err);
	}

	// 2. 在无 Git、浅克隆（如 CI fetch-depth: 1）或未提取到数据时，使用缓存兜底并合并新增提交
	if (isShallow || totalCommits === 0) {
		const cached = readCacheFile();
		if (Object.keys(cached).length > 0) {
			commitsByDate =
				totalCommits > 0 ? mergeShallowCommits(cached, commitsByDate) : cached;
			totalCommits = Object.values(commitsByDate).reduce(
				(sum, item) => sum + item.count,
				0,
			);
		}
	}

	const yearSet = new Set<string>();
	for (const date of Object.keys(commitsByDate)) {
		const year = date.slice(0, 4);
		if (year) yearSet.add(year);
	}
	const currentYear = new Date().getFullYear().toString();
	yearSet.add(currentYear);

	const years = Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
	const activeDays = Object.keys(commitsByDate).length;

	return {
		commitsByDate,
		totalCommits,
		activeDays,
		years,
	};
}
