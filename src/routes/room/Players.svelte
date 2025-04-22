<script>
	import { socket } from '$lib/game-state.js';

	const { playerList, roomStatus, playerId } = $props();

	function displayPlayerEstimate(player) {
		if (roomStatus === 'PENDING') {
			if (player.estimate) {
				return 'submitted';
			} else {
				return 'pending';
			}
		} else {
			return player.estimate;
		}
	}

	function removePlayer(player) {
		socket.send(JSON.stringify({
			eventType: 'remove-player',
			payload: {
				playerId: playerId,
				deletePlayerId: player.id
			}
		}));
	}
</script>

<section aria-label="Players">
	<h2>Players</h2>
	{#if playerList?.length === 0}
		<p>Everyone has left the room</p>
	{:else}
		<table class="player-list">
			<tbody>
			{#each playerList as player, index (index)}
				<tr class:selected={playerId === player.id}>
					<td>{player.name}</td>
					<td>{displayPlayerEstimate(player)}</td>
					<td>
						<button class="delete-button" onclick={removePlayer(player)}>❌</button>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
	{/if}
</section>
