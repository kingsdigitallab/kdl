<script lang="ts">
	import VisuallyHidden from '../visually_hidden.svelte';

	let {
		data,
		options
	}: {
		data?: { title: string; pages: { url: string; title: string }[] };
		options?: { class?: string; action?: string };
	} = $props();
</script>

{#if data && options}
	<nav class={options.class} aria-label={data.title}>
		<div class="kdl-container">
			{#if options.action}
				<input id={options.action} type="checkbox" />
				<!-- TODO: make this a button -->
				<label class="kdl-menu-button-container" role="button" for={options.action}>
					<span class="kdl-menu-button">{data.title}</span>
				</label>
			{:else}
				<VisuallyHidden tag="h2" content={data.title}></VisuallyHidden>
			{/if}

			<ol>
				{#each data.pages as page (page)}
					<li>
						<a href={page.url} aria-current="page">{page.title}</a>
					</li>
				{/each}
			</ol>
		</div>
	</nav>
{/if}

<style>
</style>
