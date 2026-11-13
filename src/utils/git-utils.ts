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
	return AUTHOR_IDENTIFIERS.some((id) => name.includes(id) || email.includes(id));
}

export function getGitCommitHistory(): GitCommitStats {
	let commitsByDate: CommitsMap = {};
	let totalCommits = 0;

	// 1. 尝试从本地 git log 读取并只保留站长本人的提交
	try {
		const raw = execSync('git log --date=short --format="%ad|||%an|||%ae|||%s"', {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "ignore"],
		});

		const lines = raw.trim().split(/\r?\n/).filter(Boolean);
		if (lines.length > 0) {
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

			// 将站长本人的最新数据更新缓存文件，方便在无 Git 或浅克隆（shallow clone）CI 环境下兜底
			try {
				const cacheDir = path.dirname(CACHE_FILE_PATH);
				if (!fs.existsSync(cacheDir)) {
					fs.mkdirSync(cacheDir, { recursive: true });
				}
				fs.writeFileSync(
					CACHE_FILE_PATH,
					JSON.stringify(commitsByDate, null, 2),
					"utf8",
				);
			} catch {
				// 忽略写入缓存失败
			}
		}
	} catch (err) {
		console.warn("[git-utils] 无法直接执行 git log，尝试从本地缓存读取:", err);
	}

	// 2. 如果本地 git log 未能提取到足够数据（如 CI 浅克隆），使用缓存兜底
	if (totalCommits === 0 && fs.existsSync(CACHE_FILE_PATH)) {
		try {
			const cacheContent = fs.readFileSync(CACHE_FILE_PATH, "utf8");
			commitsByDate = JSON.parse(cacheContent);
			totalCommits = Object.values(commitsByDate).reduce(
				(sum, item) => sum + item.count,
				0,
			);
		} catch {
			// 忽略缓存解析失败
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
