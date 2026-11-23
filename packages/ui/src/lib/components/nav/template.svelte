<script lang="ts">
	import NavItem from './nav_item.svelte';

	let {
		data,
		options
	}: {
		data: {
			title: string;
			// pagination: {
			// 	href: {
			// 		first?: string;
			// 		previous?: string;
			// 		next: string;
			// 		last: string;
			// 	};
			// 	pageNumber: number;
			// 	pages: unknown[];
			// };
			// currentUrl: string;
			pages: Record<string, unknown>[];
			// page: {
			// 	url: string;
			// 	title: string;
			// 	children: { data: unknown; options: unknown }[];
			// };
		};
		options: {
			class?: string;
			ordered: boolean;
			// nested: boolean;
		};
	} = $props();
</script>

<!-- TODO: eval previous fn -->
<nav class="kdl-nav {options.class ?? ''}" aria-label={data.title}>
	<h2 class="kdl-visually-hidden">{data.title}</h2>
	{#if options.ordered}
		<ol>
			{#each data.pages as page (page)}
				<NavItem {...page}></NavItem>
			{/each}
		</ol>
	{:else}
		<ul></ul>
		{#each data.pages as page (page)}
			<NavItem {...page}></NavItem>
		{/each}
	{/if}
</nav>

<style>
</style>
