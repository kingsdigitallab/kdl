<script lang="ts">
	let {
		data,
		options
	}: { data: { pages: { url: string; title: string }[] }; options: { class?: string } } = $props();
</script>

<nav class={options.class} aria-label="breadcrumbs">
	<div class="kdl-container">
		<ol>
			{#each data.pages as page (page)}
				<li>
					<a href={page.url} aria-current="page">{page.title}</a>
				</li>
			{/each}
		</ol>
	</div>
</nav>

<style>
</style>
