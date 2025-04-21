<script>
	const { data } = $props();
</script>

<ul>
	{#each data as player, index (index)}
		<li>{player.name}</li>
	{/each}
</ul>
