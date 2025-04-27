<script>
	import { sendMessage } from '$lib/game-state.js';

	const { playerList, roomStatus, playerId, socketUrl, sessionId } = $props();

	function displayPlayerEstimate(player) {
		if (roomStatus === 'PENDING') {
			if (player.estimate) {
				return 'VOTED';
			} else {
				return 'NOT VOTED';
			}
		} else {
			return player.estimate;
		}
	}

	async function removePlayer(player) {
		await sendMessage(socketUrl, {
			eventType: 'remove-player',
			payload: {
				sessionId,
				playerId,
				deletePlayerId: player.id
			}
		});
	}
</script>

<section aria-label="Players">
	<h2>Players</h2>
	<table class="player-list">
		<tbody>
		{#each playerList as player, index (index)}
			<tr class:selected={playerId === player.id}>
				<td>{player.name}</td>
				<td><span class="badge" class:voted={player.estimate !== null} class:not-voted={player.estimate === null}>{displayPlayerEstimate(player)}</span></td>
				<td>
					<button class="delete-button" onclick={() => removePlayer(player)}>❌</button>
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
</section>
