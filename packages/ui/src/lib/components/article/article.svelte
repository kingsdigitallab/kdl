<script lang="ts">
	import Author from "../person/author.svelte";


	let {
		options,
		data
	}: {
		data: {
			title?: string;
			date?: Date;
			subtitle?: string;
			feature?: { image?: 'string'; description?: string };
			content?: string;
			collections?: {
				people?: { data: { name: string }; url?: string }[];
			};
			authors?: string[];
		};
		options: {
			footerHtml: string;
			addLink?: boolean;
			class?: string;
			headerHtml?: string;
			html?: string;
			contentField?: string;
		};
	} = $props();
</script>

<article class={options.class}>
	<header>
		{#if data.subtitle}
			<div class="kdl-subtitle">
				<span>{data.subtitle}</span>
			</div>
		{/if}
		{#if data.feature && data.feature.image}
			<!-- TODO: add image component -->
			<!-- {{- imageMacro(data.feature) -}} -->
		{/if}
		{#if options.addLink || options.headerHtml}
			<section>
				{#if options.addLink}
					<h2>{data.title}</h2>
					<!-- {% set html %} -->
					<!--   <h2>{{ data.title | safe }}</h2> -->
					<!-- {% endset %} -->
					<!-- {{ linkMacro(data, { html: html }) }} -->
				{/if}

				{options.headerHtml}
			</section>
		{/if}
	</header>

	{#if options.html}
		{options.html}
	{:else}
		{@const content = options.contentField ? options.contentField : data.content}
		<article>{content}</article>
	{/if}

	{#if data.authors || data.date || options.footerHtml}
		<footer>
			{#if options.footerHtml}
				{options.footerHtml}
			{:else}
				{#if data.authors}
					by
					{#each data.authors as name (name)}
						{@const person = data.collections?.people?.find((person) => person.data.name === name)}
						{#if person}
							<Author {...person}></Author>
						{/if}
					{/each}
					<!-- {% for name in data.authors %} -->
					<!--   {% set person = data.collections.people | filter(name, "data.id") %} -->
					<!--   {#if person and person.length > 0 %} -->
					<!--     {{- authorMacro(person[0]) -}} -->
					<!--   {% else %} -->
					<!--     {% set personName = { name: name } %} -->
					<!--     {% set person = {data: personName} %} -->
					<!--     {{- authorMacro(person) -}} -->
					<!--   {/if} -->
					<!--   {%- if not loop.last -%}, -->
					<!--   {% endif -%} -->
					<!-- {% endfor %} -->
				{/if}
				{#if data.date}
					on
					{data.date}
				{/if}
			{/if}
		</footer>
	{/if}
</article>

<style>
</style>
