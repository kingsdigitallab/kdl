<script lang="ts">
	let { date }: { date: Date } = $props();
</script>

<!-- TODO: eval previous fn -->
<time datetime={date.toString()}>
	{date.toString()}
</time>

<style>
</style>
