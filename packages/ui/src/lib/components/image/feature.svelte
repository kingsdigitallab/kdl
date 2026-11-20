<script lang="ts">
	let { feature }: { feature: { image: string; description: string } } = $props();
</script>

<figure class="kdl-feature-image">
	<img loading="lazy" src={feature.image} alt={feature.description} />
</figure>

<style>
</style>
