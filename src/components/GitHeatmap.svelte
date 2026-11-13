<script lang="ts">
import { onMount } from "svelte";

export interface CommitDayInfo {
	count: number;
	messages: string[];
}

export let commitsByDate: Record<string, CommitDayInfo> = {};
export let totalCommits: number = 0;
export let availableYears: string[] = [];

interface DayCell {
	dateStr: string;
	formattedDate: string;
	count: number;
	messages: string[];
	dayOfWeek: number; // 0 = Sun, 6 = Sat
	month: number;
	isFuture: boolean;
	isOutOfRange: boolean;
}

interface MonthHeader {
	colIndex: number;
	name: string;
}

const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const MONTH_NAMES = [
	"1月",
	"2月",
	"3月",
	"4月",
	"5月",
	"6月",
	"7月",
	"8月",
	"9月",
	"10月",
	"11月",
	"12月",
];

let selectedFilter: string = "recent";
let scrollContainer: HTMLDivElement | null = null;

// Tooltip state
let hoveredDay: DayCell | null = null;
let tooltipX = 0;
let tooltipY = 0;
let isTooltipVisible = false;

function toDateString(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

function formatDisplayDate(d: Date): string {
	const y = d.getFullYear();
	const m = d.getMonth() + 1;
	const day = d.getDate();
	const w = WEEKDAYS[d.getDay()];
	return `${y}年${m}月${day}日 · ${w}`;
}

// Build weeks grid
$: gridData = (() => {
	const today = new Date();
	const todayStr = toDateString(today);
	let startDate: Date;
	let endDate: Date;

	if (selectedFilter === "recent") {
		// End on the Saturday of the current week
		const endSaturday = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
		);
		endSaturday.setDate(today.getDate() + (6 - today.getDay()));
		endDate = endSaturday;

		// 53 full weeks (371 days) back to Sunday
		const startSunday = new Date(endSaturday);
		startSunday.setDate(endSaturday.getDate() - (53 * 7 - 1));
		startDate = startSunday;
	} else {
		const year = Number.parseInt(selectedFilter, 10);
		const startOfYear = new Date(year, 0, 1);
		// Align start to the preceding Sunday
		startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay());
		startDate = startOfYear;

		const endOfYear = new Date(year, 11, 31);
		// Align end to the following Saturday
		endOfYear.setDate(endOfYear.getDate() + (6 - endOfYear.getDay()));
		endDate = endOfYear;
	}

	const weeks: DayCell[][] = [];
	let curWeek: DayCell[] = [];
	const cur = new Date(startDate);

	let periodTotal = 0;
	let periodActiveDays = 0;
	let periodMaxDay = 0;

	while (cur <= endDate) {
		const dateStr = toDateString(cur);
		const isFuture = dateStr > todayStr;
		const info = commitsByDate[dateStr] || { count: 0, messages: [] };

		let isOutOfRange = false;
		if (selectedFilter !== "recent") {
			const y = cur.getFullYear();
			if (y !== Number.parseInt(selectedFilter, 10)) {
				isOutOfRange = true;
			}
		}

		const count = isFuture || isOutOfRange ? 0 : info.count;
		const messages = isFuture || isOutOfRange ? [] : info.messages || [];

		if (!isFuture && !isOutOfRange && count > 0) {
			periodTotal += count;
			periodActiveDays += 1;
			if (count > periodMaxDay) {
				periodMaxDay = count;
			}
		}

		curWeek.push({
			dateStr,
			formattedDate: formatDisplayDate(cur),
			count,
			messages,
			dayOfWeek: cur.getDay(),
			month: cur.getMonth(),
			isFuture,
			isOutOfRange,
		});

		if (curWeek.length === 7) {
			weeks.push(curWeek);
			curWeek = [];
		}

		cur.setDate(cur.getDate() + 1);
	}

	// Month header positions
	const monthHeaders: MonthHeader[] = [];
	let lastMonth = -1;
	weeks.forEach((week, index) => {
		// If week contains a first day of month or month changes
		const firstDayOfMonthInWeek = week.find((day) => {
			const dayNum = Number.parseInt(day.dateStr.slice(-2), 10);
			return dayNum <= 7 && !day.isOutOfRange;
		});

		if (firstDayOfMonthInWeek && firstDayOfMonthInWeek.month !== lastMonth) {
			monthHeaders.push({
				colIndex: index,
				name: MONTH_NAMES[firstDayOfMonthInWeek.month],
			});
			lastMonth = firstDayOfMonthInWeek.month;
		}
	});

	return {
		weeks,
		monthHeaders,
		periodTotal,
		periodActiveDays,
		periodMaxDay,
	};
})();

function getLevel(count: number): number {
	if (count <= 0) return 0;
	if (count <= 2) return 1;
	if (count <= 5) return 2;
	if (count <= 9) return 3;
	return 4;
}

function handleMouseEnter(day: DayCell, event: MouseEvent) {
	if (day.isFuture || day.isOutOfRange) return;
	hoveredDay = day;

	const target = event.currentTarget as HTMLElement;
	const rect = target.getBoundingClientRect();
	tooltipX = rect.left + rect.width / 2;
	tooltipY = rect.top - 8;
	isTooltipVisible = true;
}

function handleMouseLeave() {
	isTooltipVisible = false;
	hoveredDay = null;
}

function scrollToRecent() {
	if (scrollContainer) {
		scrollContainer.scrollLeft = scrollContainer.scrollWidth;
	}
}

onMount(() => {
	scrollToRecent();
});

function handleFilterChange(filter: string) {
	selectedFilter = filter;
	setTimeout(scrollToRecent, 50);
}
</script>

<div class="card-base p-6 md:p-8 rounded-[var(--radius-large)] overflow-hidden relative mb-4 w-full">
	<!-- Top Title & Filter Bar -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
		<div class="flex items-center gap-2.5">
			<div class="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
				</svg>
			</div>
			<div>
				<h2 class="text-lg md:text-xl font-bold text-black/85 dark:text-white/85 flex items-center gap-2">
					博客修改热力图
				</h2>
				<p class="text-xs text-black/50 dark:text-white/50">
					真实记录博主在当前仓库的 Git 提交轨迹
				</p>
			</div>
		</div>

		<!-- Year Tabs -->
		<div class="flex items-center gap-1.5 overflow-x-auto hide-scrollbar p-1 rounded-xl bg-black/5 dark:bg-white/5 self-start sm:self-auto max-w-full">
			<button
				type="button"
				class="px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-200 whitespace-nowrap {selectedFilter === 'recent' ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}"
				on:click={() => handleFilterChange('recent')}
			>
				最近一年
			</button>
			{#each availableYears as year}
				<button
					type="button"
					class="px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-200 whitespace-nowrap {selectedFilter === year ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}"
					on:click={() => handleFilterChange(year)}
				>
					{year}
				</button>
			{/each}
		</div>
	</div>

	<!-- Stats Pills -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
		<div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
			<div class="text-xs text-black/50 dark:text-white/50">区间修改次数</div>
			<div class="text-lg font-bold text-[var(--primary)] mt-0.5">
				{gridData.periodTotal} <span class="text-xs font-normal text-black/50 dark:text-white/50">次</span>
			</div>
		</div>
		<div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
			<div class="text-xs text-black/50 dark:text-white/50">活跃打卡天数</div>
			<div class="text-lg font-bold text-black/80 dark:text-white/80 mt-0.5">
				{gridData.periodActiveDays} <span class="text-xs font-normal text-black/50 dark:text-white/50">天</span>
			</div>
		</div>
		<div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
			<div class="text-xs text-black/50 dark:text-white/50">单日最高提交</div>
			<div class="text-lg font-bold text-black/80 dark:text-white/80 mt-0.5">
				{gridData.periodMaxDay} <span class="text-xs font-normal text-black/50 dark:text-white/50">次</span>
			</div>
		</div>
		<div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
			<div class="text-xs text-black/50 dark:text-white/50">博主累计提交</div>
			<div class="text-lg font-bold text-black/80 dark:text-white/80 mt-0.5">
				{totalCommits} <span class="text-xs font-normal text-black/50 dark:text-white/50">次</span>
			</div>
		</div>
	</div>

	<!-- Heatmap Container -->
	<div
		bind:this={scrollContainer}
		class="w-full overflow-x-auto hide-scrollbar pb-2 pt-1"
	>
		<div class="min-w-fit flex flex-col gap-1.5 select-none">
			<!-- Month Header Row -->
			<div class="flex items-center text-[10px] text-black/40 dark:text-white/40 h-4 pl-7 relative">
				{#each gridData.monthHeaders as header}
					<span
						class="absolute font-medium"
						style="left: calc(1.75rem + {header.colIndex * 15.5}px);"
					>
						{header.name}
					</span>
				{/each}
			</div>

			<!-- Weeks Grid with Left Weekday Labels -->
			<div class="flex gap-1.5 items-start">
				<!-- Left Weekday Labels (Mon, Wed, Fri) -->
				<div class="flex flex-col gap-1.5 text-[9px] text-black/35 dark:text-white/35 pr-1 py-[1px] w-6 text-right leading-none select-none">
					<span class="h-3 md:h-3.5 flex items-center justify-end opacity-0">日</span>
					<span class="h-3 md:h-3.5 flex items-center justify-end">一</span>
					<span class="h-3 md:h-3.5 flex items-center justify-end opacity-0">二</span>
					<span class="h-3 md:h-3.5 flex items-center justify-end">三</span>
					<span class="h-3 md:h-3.5 flex items-center justify-end opacity-0">四</span>
					<span class="h-3 md:h-3.5 flex items-center justify-end">五</span>
					<span class="h-3 md:h-3.5 flex items-center justify-end opacity-0">六</span>
				</div>

				<!-- Columns of Weeks -->
				{#each gridData.weeks as week}
					<div class="flex flex-col gap-1.5">
						{#each week as day}
							{#if day.isFuture || day.isOutOfRange}
								<div class="w-3 h-3 md:w-3.5 md:h-3.5 rounded-[3px] opacity-0 pointer-events-none"></div>
							{:else}
								<!-- svelte-ignore a11y-mouse-events-have-key-events -->
								<div
									class="w-3 h-3 md:w-3.5 md:h-3.5 rounded-[3px] transition-all duration-150 cursor-pointer
										{day.count === 0 ? 'bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.03] dark:border-white/[0.04]' : ''}
										{getLevel(day.count) === 1 ? 'bg-[var(--primary)]/25 border border-[var(--primary)]/30' : ''}
										{getLevel(day.count) === 2 ? 'bg-[var(--primary)]/50 border border-[var(--primary)]/55' : ''}
										{getLevel(day.count) === 3 ? 'bg-[var(--primary)]/75 border border-[var(--primary)]/80 text-white' : ''}
										{getLevel(day.count) === 4 ? 'bg-[var(--primary)] border border-[var(--primary)] shadow-sm' : ''}
										hover:scale-125 hover:z-20 hover:ring-2 hover:ring-[var(--primary)]/40"
									on:mouseenter={(e) => handleMouseEnter(day, e)}
									on:mouseleave={handleMouseLeave}
									role="gridcell"
									tabindex="0"
									aria-label="{day.dateStr}: {day.count} 次提交"
								></div>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Footer Legend & Tip -->
	<div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-black/50 dark:text-white/50 pt-4 mt-2 border-t border-[var(--line-divider)]">
		<div class="flex items-center gap-1.5">
			<span>💡 提示：鼠标悬停在方块上可查看当日具体的修改内容</span>
		</div>
		<div class="flex items-center gap-1.5">
			<span class="text-[11px]">少</span>
			<div class="w-3 h-3 rounded-[3px] bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.03] dark:border-white/[0.04]"></div>
			<div class="w-3 h-3 rounded-[3px] bg-[var(--primary)]/25 border border-[var(--primary)]/30"></div>
			<div class="w-3 h-3 rounded-[3px] bg-[var(--primary)]/50 border border-[var(--primary)]/55"></div>
			<div class="w-3 h-3 rounded-[3px] bg-[var(--primary)]/75 border border-[var(--primary)]/80"></div>
			<div class="w-3 h-3 rounded-[3px] bg-[var(--primary)] border border-[var(--primary)]"></div>
			<span class="text-[11px]">多</span>
		</div>
	</div>
</div>

<!-- Floating Tooltip -->
{#if isTooltipVisible && hoveredDay}
	<div
		class="fixed z-[100] -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-75 ease-out"
		style="left: {tooltipX}px; top: {tooltipY}px;"
	>
		<div class="bg-white/95 dark:bg-[#1a1b26]/95 backdrop-blur-md text-black/90 dark:text-white/90 shadow-2xl border border-black/10 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs max-w-xs sm:max-w-sm">
			<div class="font-bold text-black/85 dark:text-white/85 flex items-center justify-between gap-3 pb-1 border-b border-black/10 dark:border-white/10">
				<span>{hoveredDay.formattedDate}</span>
				<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold {hoveredDay.count > 0 ? 'bg-[var(--primary)]/15 text-[var(--primary)]' : 'bg-black/5 dark:bg-white/10 text-black/40 dark:text-white/40'}">
					{hoveredDay.count} 次提交
				</span>
			</div>
			{#if hoveredDay.messages && hoveredDay.messages.length > 0}
				<ul class="mt-2 space-y-1 text-[11px] text-black/70 dark:text-white/70 max-h-36 overflow-y-auto">
					{#each hoveredDay.messages as msg}
						<li class="truncate flex items-start gap-1.5">
							<span class="text-[var(--primary)] font-bold">•</span>
							<span class="truncate">{msg}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="text-[11px] text-black/40 dark:text-white/40 mt-1">当天没有代码或文章更新记录</div>
			{/if}
		</div>
		<!-- Tooltip small down arrow -->
		<div class="w-2.5 h-2.5 bg-white/95 dark:bg-[#1a1b26]/95 border-r border-b border-black/10 dark:border-white/10 rotate-45 mx-auto -mt-1.5"></div>
	</div>
{/if}

<style>
.hide-scrollbar::-webkit-scrollbar {
	display: none;
}
.hide-scrollbar {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
