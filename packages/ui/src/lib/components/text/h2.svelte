<script lang="ts">
	let { children, id } = $props();
</script>

<h2 {id}>{@render children()}</h2>

<style>
	#intro {
		display: none;
	}
</style>
