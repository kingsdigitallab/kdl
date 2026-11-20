<script lang="ts">
	let { tag, content }: { tag: string; content: string } = $props();
	// NOTE: tag is a html tag, we're just gonna log the tag but use span for now
	console.log(tag);
</script>

<span class="kdl-visually-hidden">{@html content}</span>

<style>
</style>
