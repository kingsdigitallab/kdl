<script lang="ts">
	let {
		data,
		options
	}: {
		data: {
			pagination: {
				href: {
					first?: string;
					previous?: string;
					next: string;
					last: string;
				};
				pageNumber: number;
				pages: unknown[];
			};
			currentUrl: string;
			// page: {
			// 	url: string;
			// 	title: string;
			// 	children: { data: unknown; options: unknown }[];
			// };
		};
		options: {
			class: string;
			// nested: boolean;
		};
	} = $props();
</script>

<nav class={options.class} aria-label="pagination">
	<ol>
		<li>
			{#if data.currentUrl != data.pagination.href.first}
				<a href={data.pagination.href.first}>First</a>
			{:else}
				<a class="kdl-link-disabled" href="#" aria-disabled="true">First</a>
			{/if}
			<!-- <a {% if data.currentUrl != pagination.href.first %} href="{{ pagination.href.first }}" {% else %} class="kdl-link-disabled" href="#" aria-disabled="true" {% endif -%}>First {{ visuallyHiddenMacro("span", "page") }}</a> -->
		</li>
		<li>
			{#if data.pagination.href.previous}
				<a href={data.pagination.href.previous}>Previous</a>
			{:else}
				<a class="kdl-link-disabled" href="#" aria-disabled="true">Previous</a>
			{/if}
			<!-- <a {% if pagination.href.previous %} href="{{ pagination.href.previous }}" {% else %} class="kdl-link-disabled" href="#" aria-disabled="true" {% endif -%}>Previous {{ visuallyHiddenMacro("span", "page") }}</a> -->
		</li>
		<li>Page {data.pagination.pageNumber + 1} of {data.pagination.pages.length}</li>
		<li>
			{#if data.pagination.href.next}
				<a href={data.pagination.href.next}>Next</a>
			{:else}
				<a class="kdl-link-disabled" href="#" aria-disabled="true">Next</a>
			{/if}
			<!-- <a {% if pagination.href.next %} href="{{ pagination.href.next }}" {% else %} class="kdl-link-disabled" href="#" aria-disabled="true" {% endif -%}>Next {{ visuallyHiddenMacro("span", "page") }}</a> -->
		</li>
		<li>
			{#if data.currentUrl != data.pagination.href.last}
				<a href={data.pagination.href.last}>Last</a>
			{:else}
				<a class="kdl-link-disabled" href="#" aria-disabled="true">Last</a>
			{/if}
			<!-- <a {% if data.currentUrl != pagination.href.last %} href="{{ pagination.href.last }}" {% else %} class="kdl-link-disabled" href="#" aria-disabled="true" {% endif -%}>Last {{ visuallyHiddenMacro("span", "page") }}</a> -->
		</li>
	</ol>
</nav>

<style>
</style>
