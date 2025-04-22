<script>
	const { playerList, roomStatus, playerId } = $props();

	function displayPlayerEstimate(player) {
		if (roomStatus === 'PENDING') {
			if (player.estimate) {
				console.log('left', player.id);
				console.log('right', playerId);

				if (player.id === playerId) {
					return player.estimate;
				}
				return 'submitted';
			} else {
				return 'pending';
			}
		} else {
			return player.estimate;
		}
	}
</script>

<section aria-label="Players">
	<h2>Players</h2>
	<table class="player-list">
		<tbody>
		{#each playerList as player, index (index)}
			<tr class:selected={playerId === player.id}>
				<td>{player.name}</td>
				<td>{displayPlayerEstimate(player)}</td>
			</tr>
		{/each}
		</tbody>
	</table>
</section>
