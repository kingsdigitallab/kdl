<script lang="ts">
	let {
		data,
		options
	}: { data: { page: { url: string }; title: string }; options: { html?: string } } = $props();
</script>

<a href={data.page.url}>
	{#if options.html}
		{@html options.html}
	{:else}
		{data.title}
	{/if}
</a>

<style>
</style>
