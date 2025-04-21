<script>
	const { data } = $props();
</script>

<div>
	{#each data as point, index (index)}
		<button>{point}</button>
	{/each}
</div>