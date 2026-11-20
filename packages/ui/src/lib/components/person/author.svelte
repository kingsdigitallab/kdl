<script lang="ts">
	let { data }: { data: { url?: string; data: { name: string } } } = $props();
</script>

<span class="author">
	{#if data.url}
		<a href={data.url}>{data.data.name}</a>
	{:else}
		{data.data.name}
	{/if}
</span>

<style>
</style>
