<script lang="ts">
	import NavItem from './nav_item.svelte';
	let {
		data,
		options
	}: {
		data: {
			currentUrl: string;
			page: {
				url: string;
				title: string;
				children: { data: unknown; options: unknown }[];
			};
		};
		options: {
			activeClass: string;
			nested: boolean;
		};
	} = $props();
</script>

<!-- NOTE: this should be the slug, not the title -->
<li class={data.currentUrl === data.page.title ? (options.activeClass ?? 'active') : ''}>
	{#if data.page.children.length && options.nested}
		<input id="menu-{data.page.title}" type="checkbox" hidden />
		<label class="kdl-checkbox" for="menu-{data.page.title}">{data.page.title}</label>
		<span>
			<!-- TODO: make sure this matches previous logic -->
			{#each data.page.children as child (child)}
				<NavItem {...child}></NavItem>
			{/each}
		</span>

		<!-- <{ options.listTag }> -->
		<!-- {%- for child in page.children -%} -->
		<!--   {{ -->
		<!--   navItemMacro({ -->
		<!--   page: child, -->
		<!--   currentUrl: data.currentUrl, -->
		<!--   nested: options.nested, -->
		<!--   listTag: options.listTag -->
		<!--   }) -->
		<!--   }} -->
		<!-- {%- endfor %} -->
		<!-- </{{ options.listTag }}> -->
	{:else}
		<a href={data.page.url}>{data.page.title}</a>
	{/if}
</li>

<style>
</style>
