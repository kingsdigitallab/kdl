<script lang="ts">
	let {
		data
	}: { data: { url?: string; title: string; feature?: { image: string; description: string } } } =
		$props();
</script>

<div class="sitename">
	<a href={data.url ?? '/'}>{data.title}</a>
</div>
{#if data.feature}
	<div class="logo">
		<a href={data.url ?? '/'}>
			<img src={data.feature.image} alt={data.feature.description} />
		</a>
	</div>
{/if}

<style>
</style>
