<script lang="ts">
import { onMount } from "svelte";
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";
import { getPostUrlBySlug } from "../utils/url-utils";

interface Post {
	slug: string;
	data: {
		title: string;
		tags: string[];
		category?: string | null;
		published: Date;
		pinned?: boolean | number;
	};
}

export let sortedPosts: Post[] = [];

let selectedCategory = "all";

const uncategorizedName = i18n(I18nKey.uncategorized) || "Uncategorized";

function formatDate(date: Date) {
	if (!date) return "";
	const d = new Date(date);
	const year = d.getFullYear();
	const month = (d.getMonth() + 1).toString().padStart(2, "0");
	const day = d.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}

// Group posts by category
$: groupMap = (() => {
	const map = new Map<string, Post[]>();
	for (const post of sortedPosts) {
		const rawCat = post.data.category;
		const cat =
			rawCat && typeof rawCat === "string" && rawCat.trim() !== ""
				? rawCat.trim()
				: uncategorizedName;
		if (!map.has(cat)) {
			map.set(cat, []);
		}
		map.get(cat)!.push(post);
	}
	return map;
})();

$: sortedCategoryNames = Array.from(groupMap.keys()).sort((a, b) => {
	if (a === uncategorizedName) return 1;
	if (b === uncategorizedName) return -1;
	return a.localeCompare(b, "zh-CN");
});

$: allGroups = sortedCategoryNames.map((name) => ({
	name,
	posts: groupMap.get(name) || [],
}));

$: categoryList = allGroups.map((g) => ({
	name: g.name,
	count: g.posts.length,
}));

$: displayGroups =
	selectedCategory === "all"
		? allGroups
		: allGroups.filter(
				(g) => g.name.toLowerCase() === selectedCategory.toLowerCase(),
			);

$: totalPostsCount = sortedPosts.length;

onMount(() => {
	const params = new URLSearchParams(window.location.search);
	if (params.get("uncategorized") === "true") {
		selectedCategory = uncategorizedName;
	} else if (params.has("category")) {
		const catParam = params.get("category");
		if (catParam) {
			selectedCategory = catParam;
		}
	}
});

function selectCat(cat: string) {
	selectedCategory = cat;

	const newUrl = new URL(window.location.href);
	if (cat === "all") {
		newUrl.searchParams.delete("category");
		newUrl.searchParams.delete("uncategorized");
	} else if (cat === uncategorizedName) {
		newUrl.searchParams.delete("category");
		newUrl.searchParams.set("uncategorized", "true");
	} else {
		newUrl.searchParams.delete("uncategorized");
		newUrl.searchParams.set("category", cat);
	}
	window.history.replaceState({}, "", newUrl.toString());
}
</script>

<div class="card-base px-6 md:px-8 py-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-black/10 dark:border-white/10">
        <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary)] text-white dark:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2H4z"/>
                </svg>
            </div>
            <div>
                <h1 class="text-2xl font-bold text-black/90 dark:text-white/90">Category</h1>
                <p class="text-xs text-black/50 dark:text-white/50 mt-0.5">
                    共 {categoryList.length} 个分类，{totalPostsCount} 篇文章
                </p>
            </div>
        </div>
    </div>

    <!-- Category Pills Filter Bar -->
    <div class="flex flex-wrap gap-2 mb-8">
        <button
            type="button"
            on:click={() => selectCat("all")}
            class="btn-regular px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 active:scale-95 flex items-center gap-2 {selectedCategory === 'all' ? '!bg-[var(--primary)] !text-white dark:!text-black font-bold shadow-sm' : 'hover:text-[var(--primary)]'}"
        >
            <span>全部 / All</span>
            <span class="text-xs px-1.5 py-0.5 rounded-full {selectedCategory === 'all' ? 'bg-white/20 dark:bg-black/20' : 'bg-black/5 dark:bg-white/10'}">
                {totalPostsCount}
            </span>
        </button>

        {#each categoryList as cat}
            <button
                type="button"
                on:click={() => selectCat(cat.name)}
                class="btn-regular px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 active:scale-95 flex items-center gap-2 {selectedCategory.toLowerCase() === cat.name.toLowerCase() ? '!bg-[var(--primary)] !text-white dark:!text-black font-bold shadow-sm' : 'hover:text-[var(--primary)]'}"
            >
                <span>{cat.name}</span>
                <span class="text-xs px-1.5 py-0.5 rounded-full {selectedCategory.toLowerCase() === cat.name.toLowerCase() ? 'bg-white/20 dark:bg-black/20' : 'bg-black/5 dark:bg-white/10'}">
                    {cat.count}
                </span>
            </button>
        {/each}
    </div>

    <!-- Category Groups -->
    <div class="space-y-8">
        {#each displayGroups as group}
            <div class="category-section" id={group.name}>
                <!-- Category Section Title -->
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-2.5 h-6 rounded-full bg-[var(--primary)]"></div>
                    <h2 class="text-xl font-bold text-black/90 dark:text-white/90">
                        {group.name}
                    </h2>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
                        {group.posts.length} {i18n(group.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount)}
                    </span>
                </div>

                <!-- Articles in Category -->
                <div class="space-y-1 pl-1 md:pl-2">
                    {#each group.posts as post}
                        <a
                            href={getPostUrlBySlug(post.slug)}
                            aria-label={post.data.title}
                            class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
                        >
                            <div class="flex flex-row justify-start items-center h-full">
                                <!-- date -->
                                <div class="w-[20%] md:w-[12%] transition text-sm text-right text-50 shrink-0">
                                    {formatDate(post.data.published)}
                                </div>

                                <!-- dot and line -->
                                <div class="w-[12%] md:w-[8%] relative dash-line h-full flex items-center">
                                    <div
                                        class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
                                        bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
                                        outline outline-4 z-50
                                        outline-[var(--card-bg)]
                                        group-hover:outline-[var(--btn-plain-bg-hover)]
                                        group-active:outline-[var(--btn-plain-bg-active)]"
                                    ></div>
                                </div>

                                <!-- title -->
                                <div
                                    class="w-[68%] md:w-[62%] text-left font-bold group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
                                    text-75 pr-4 whitespace-nowrap overflow-ellipsis overflow-hidden flex items-center gap-2"
                                >
                                    {#if post.data.pinned}
                                        <span class="inline-flex items-center text-xs font-semibold px-1.5 py-0.2 rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 shrink-0">
                                            {i18n(I18nKey.pinned)}
                                        </span>
                                    {/if}
                                    <span class="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {post.data.title}
                                    </span>
                                </div>

                                <!-- tags -->
                                <div
                                    class="hidden md:flex md:w-[18%] justify-end text-sm transition
                                    whitespace-nowrap overflow-ellipsis overflow-hidden text-30 gap-1.5"
                                >
                                    {#if post.data.tags && post.data.tags.length > 0}
                                        {#each post.data.tags.slice(0, 2) as tag}
                                            <span>#{tag}</span>
                                        {/each}
                                    {/if}
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        {/each}

        {#if displayGroups.length === 0}
            <div class="text-center py-12 text-black/40 dark:text-white/40">
                暂无该分类的文章 / No posts in this category
            </div>
        {/if}
    </div>
</div>
