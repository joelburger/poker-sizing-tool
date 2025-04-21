<script>
	const { data } = $props();
</script>

<ul>
	{#each data as player, index (index)}
		<li>{player}</li>
	{/each}
</ul>
