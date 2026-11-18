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

interface CommitRecord {
	hash: string;
	date: string;
	message: string;
}

interface GitHubCommitApiItem {
	sha?: string;
	commit?: {
		message?: string;
		author?: {
			name?: string;
			email?: string;
			date?: string;
		};
	};
	author?: {
		login?: string;
	} | null;
}

const CACHE_FILE_PATH = path.join(
	process.cwd(),
	"src",
	"assets",
	"git-commits.json",
);

const DEFAULT_GITHUB_REPO = "Siesta666/fuwari";
const BLOG_TIMEZONE = "Asia/Shanghai";

const DATE_PARTS_FORMATTER = new Intl.DateTimeFormat("en-CA", {
	timeZone: BLOG_TIMEZONE,
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
});

// 站长身份标识（用于在 fork 仓库中过滤出站长自己的提交，排除原主题上游贡献者的提交）
const AUTHOR_IDENTIFIERS = ["siesta", "1169391936"];

function isUserCommit(authorName: string, authorEmail: string): boolean {
	const name = (authorName || "").toLowerCase();
	const email = (authorEmail || "").toLowerCase();
	return AUTHOR_IDENTIFIERS.some(
		(id) => name.includes(id) || email.includes(id),
	);
}

function formatDateInTimeZone(dateInput: string): string {
	const parsed = new Date(dateInput);
	if (Number.isNaN(parsed.getTime())) {
		return /^\d{4}-\d{2}-\d{2}/.test(dateInput) ? dateInput.slice(0, 10) : "";
	}
	const parts = DATE_PARTS_FORMATTER.formatToParts(parsed);
	const year = parts.find((p) => p.type === "year")?.value;
	const month = parts.find((p) => p.type === "month")?.value;
	const day = parts.find((p) => p.type === "day")?.value;
	if (!year || !month || !day) {
		return "";
	}
	return `${year}-${month}-${day}`;
}

function shiftIsoDateDays(dateStr: string, deltaDays: number): string {
	const [y, m, d] = dateStr.split("-").map((v) => Number.parseInt(v, 10));
	if (!y || !m || !d) return dateStr;
	const dt = new Date(Date.UTC(y, m - 1, d + deltaDays));
	return dt.toISOString().slice(0, 10);
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

function tryUnshallowRepository(): boolean {
	try {
		execSync("git fetch --unshallow --no-tags", {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "ignore"],
			timeout: 15000,
		});
		return !isShallowRepository();
	} catch {
		return false;
	}
}

function getGitHubRepoSlug(): string {
	try {
		const remoteUrl = execSync("git remote get-url origin", {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "ignore"],
		}).trim();
		const match = remoteUrl.match(
			/(?:github\.com[:/])([^/]+)\/([^/.\s]+?)(?:\.git)?$/i,
		);
		if (match?.[1] && match[2]) {
			return `${match[1]}/${match[2]}`;
		}
	} catch {
		// 忽略远程解析失败，回退默认仓库
	}
	return DEFAULT_GITHUB_REPO;
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

function buildCommitDay(records: CommitRecord[]): CommitDay {
	const messages: string[] = [];
	for (const record of records) {
		if (messages.length < 5 && record.message) {
			messages.push(record.message);
		}
	}
	return {
		count: records.length,
		messages,
	};
}

function toCommitsMap(recordsByDate: Record<string, CommitRecord[]>): {
	commitsByDate: CommitsMap;
	totalCommits: number;
} {
	const commitsByDate: CommitsMap = {};
	let totalCommits = 0;

	const sortedDates = Object.keys(recordsByDate).sort((a, b) =>
		b.localeCompare(a),
	);
	for (const date of sortedDates) {
		const records = recordsByDate[date];
		commitsByDate[date] = buildCommitDay(records);
		totalCommits += records.length;
	}

	return { commitsByDate, totalCommits };
}

function parseGitLog(): {
	commitsByDate: CommitsMap;
	recordsByDate: Record<string, CommitRecord[]>;
	totalCommits: number;
} {
	const recordsByDate: Record<string, CommitRecord[]> = {};

	const raw = execSync(
		'git log --date=iso-strict --format="%H|||%aI|||%an|||%ae|||%s"',
		{
			encoding: "utf8",
			stdio: ["pipe", "pipe", "ignore"],
			maxBuffer: 10 * 1024 * 1024,
		},
	);

	const lines = raw.trim().split(/\r?\n/).filter(Boolean);
	for (const line of lines) {
		const [hash, rawDate, authorName, authorEmail, ...rest] = line.split("|||");
		const message = rest.join("|||").trim();
		const date = formatDateInTimeZone(rawDate || "");
		if (!date) continue;

		// 只统计站长本人的提交，过滤掉上游主题维护者的提交
		if (!isUserCommit(authorName, authorEmail)) {
			continue;
		}

		if (!recordsByDate[date]) {
			recordsByDate[date] = [];
		}
		recordsByDate[date].push({ hash: hash || "", date, message });
	}

	const { commitsByDate, totalCommits } = toCommitsMap(recordsByDate);
	return { commitsByDate, recordsByDate, totalCommits };
}

async function fetchCommitsFromGitHub(
	sinceDate?: string,
): Promise<Record<string, CommitRecord[]> | null> {
	const repoSlug = getGitHubRepoSlug();
	const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
	const headers: Record<string, string> = {
		Accept: "application/vnd.github+json",
		"User-Agent": "fuwari-blog-heatmap",
	};
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const recordsByDate: Record<string, CommitRecord[]> = {};
	const maxPages = sinceDate ? 3 : 6;

	try {
		for (let page = 1; page <= maxPages; page += 1) {
			const params = new URLSearchParams({
				per_page: "100",
				page: String(page),
			});
			if (sinceDate) {
				params.set("since", `${sinceDate}T00:00:00Z`);
			}

			const response = await fetch(
				`https://api.github.com/repos/${repoSlug}/commits?${params.toString()}`,
				{
					headers,
					signal: AbortSignal.timeout(8000),
				},
			);
			if (!response.ok) {
				return null;
			}

			const items = (await response.json()) as GitHubCommitApiItem[];
			if (!Array.isArray(items) || items.length === 0) {
				break;
			}

			for (const item of items) {
				const authorName =
					item.commit?.author?.name || item.author?.login || "";
				const authorEmail = item.commit?.author?.email || "";
				if (!isUserCommit(authorName, authorEmail)) {
					continue;
				}

				const date = formatDateInTimeZone(item.commit?.author?.date || "");
				if (!date) continue;

				const message = (item.commit?.message || "").split(/\r?\n/)[0].trim();
				if (!recordsByDate[date]) {
					recordsByDate[date] = [];
				}
				recordsByDate[date].push({
					hash: item.sha || "",
					date,
					message,
				});
			}

			if (items.length < 100) {
				break;
			}
		}

		return recordsByDate;
	} catch {
		return null;
	}
}

function cloneCommitsMap(source: CommitsMap): CommitsMap {
	const cloned: CommitsMap = {};
	for (const [date, info] of Object.entries(source)) {
		cloned[date] = {
			count: info.count,
			messages: [...(info.messages || [])],
		};
	}
	return cloned;
}

function mergeGitHubCommits(
	cached: CommitsMap,
	apiRecordsByDate: Record<string, CommitRecord[]>,
	maxCachedDate: string,
): CommitsMap {
	const merged = cloneCommitsMap(cached);
	const boundaryDate = maxCachedDate ? shiftIsoDateDays(maxCachedDate, -1) : "";

	for (const [date, records] of Object.entries(apiRecordsByDate)) {
		if (date > maxCachedDate) {
			merged[date] = buildCommitDay(records);
		} else if (
			date >= boundaryDate &&
			records.length >= (merged[date]?.count || 0)
		) {
			merged[date] = buildCommitDay(records);
		}
	}

	return merged;
}

function mergeShallowCommits(
	cached: CommitsMap,
	shallowByDate: Record<string, CommitRecord[]>,
): CommitsMap {
	const merged = cloneCommitsMap(cached);
	const cachedDates = Object.keys(merged).sort();
	const maxCachedDate = cachedDates[cachedDates.length - 1] || "";

	for (const [date, records] of Object.entries(shallowByDate)) {
		if (date > maxCachedDate) {
			merged[date] = buildCommitDay(records);
		} else if (date === maxCachedDate && merged[date]) {
			const cachedMsgFreq = new Map<string, number>();
			for (const msg of merged[date].messages || []) {
				if (msg) {
					cachedMsgFreq.set(msg, (cachedMsgFreq.get(msg) || 0) + 1);
				}
			}

			const shallowMsgFreq = new Map<string, number>();
			for (const record of records) {
				if (record.message) {
					shallowMsgFreq.set(
						record.message,
						(shallowMsgFreq.get(record.message) || 0) + 1,
					);
				}
			}

			for (const [msg, shallowFreq] of shallowMsgFreq.entries()) {
				const cachedFreq = cachedMsgFreq.get(msg) || 0;
				if (shallowFreq > cachedFreq) {
					const extra = shallowFreq - cachedFreq;
					merged[date].count += extra;
					for (let i = 0; i < extra && merged[date].messages.length < 5; i++) {
						merged[date].messages.unshift(msg);
					}
				}
			}

			if (records.length > merged[date].count) {
				merged[date].count = records.length;
			}
		}
	}

	return merged;
}

export async function getGitCommitHistory(): Promise<GitCommitStats> {
	let commitsByDate: CommitsMap = {};
	let recordsByDate: Record<string, CommitRecord[]> = {};
	let totalCommits = 0;
	let isShallow = false;

	// 1. 尝试从本地 git log 读取；若为浅克隆，先尝试自动补全历史（CI 环境通常支持）
	try {
		isShallow = isShallowRepository();
		if (isShallow) {
			const unshallowed = tryUnshallowRepository();
			if (unshallowed) {
				isShallow = false;
			}
		}

		const parsed = parseGitLog();
		commitsByDate = parsed.commitsByDate;
		recordsByDate = parsed.recordsByDate;
		totalCommits = parsed.totalCommits;

		// 仅在完整仓库历史下更新缓存，避免浅克隆 CI 环境覆盖完整历史记录
		if (!isShallow && totalCommits > 0) {
			writeCacheFile(commitsByDate);
		}
	} catch (err) {
		console.warn("[git-utils] 无法直接执行 git log，尝试补全或读取缓存:", err);
	}

	// 2. 在无 Git、浅克隆且无法 unshallow 时：优先通过 GitHub API 增量拉取完整区间提交，失败再回退到本地浅克隆合并
	if (isShallow || totalCommits === 0) {
		const cached = readCacheFile();
		const cachedDates = Object.keys(cached).sort();
		const maxCachedDate = cachedDates[cachedDates.length - 1] || "";

		// 提前 2 天作为 since 起点以覆盖时区边界，保证 maxCachedDate 及之后日期的提交完整无遗漏
		const sinceDate = maxCachedDate
			? shiftIsoDateDays(maxCachedDate, -2)
			: undefined;
		const apiRecords = await fetchCommitsFromGitHub(sinceDate);

		if (apiRecords && Object.keys(apiRecords).length > 0) {
			commitsByDate =
				Object.keys(cached).length > 0
					? mergeGitHubCommits(cached, apiRecords, maxCachedDate)
					: toCommitsMap(apiRecords).commitsByDate;
			if (Object.keys(recordsByDate).length > 0) {
				// 兜底合并本地浅克隆可能包含但尚未推送的提交
				const apiMaxDate = Object.keys(commitsByDate).sort().pop() || "";
				const unpushedShallow: Record<string, CommitRecord[]> = {};
				for (const [date, records] of Object.entries(recordsByDate)) {
					if (date > apiMaxDate) {
						unpushedShallow[date] = records;
					}
				}
				if (Object.keys(unpushedShallow).length > 0) {
					commitsByDate = mergeShallowCommits(commitsByDate, unpushedShallow);
				}
			}
		} else if (Object.keys(cached).length > 0) {
			commitsByDate =
				Object.keys(recordsByDate).length > 0
					? mergeShallowCommits(cached, recordsByDate)
					: cached;
		}

		totalCommits = Object.values(commitsByDate).reduce(
			(sum, item) => sum + item.count,
			0,
		);
	}

	const yearSet = new Set<string>();
	for (const date of Object.keys(commitsByDate)) {
		const year = date.slice(0, 4);
		if (year) yearSet.add(year);
	}
	const currentYear = formatDateInTimeZone(new Date().toISOString()).slice(
		0,
		4,
	);
	if (currentYear) {
		yearSet.add(currentYear);
	}

	const years = Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
	const activeDays = Object.keys(commitsByDate).length;

	return {
		commitsByDate,
		totalCommits,
		activeDays,
		years,
	};
}
