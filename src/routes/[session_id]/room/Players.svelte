<script>
	import { sendMessage } from '$lib/game-state.js';

	const { players, roomStatus, playerId, socketUrl, sessionId } = $props();

	function displayPlayerEstimate(player) {
		if (player.estimate) {
			return roomStatus === 'PENDING' ? 'VOTED' : player.estimate;
		}
		return 'NOT VOTED';
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
		{#each players as player, index (index)}
			<tr class:selected={playerId === player.id}>
				<td class="player-info">
					{#if player.avatar}
						<img class="avatar" src={`/avatars/${player.avatar}`} alt={player.avatar} />
					{/if}
					{player.name}</td>
				<td><span class="badge" class:voted={player.estimate !== null}
									class:not-voted={player.estimate === null}>{displayPlayerEstimate(player)}</span></td>
				<td>
					<button class="delete-button" onclick={() => removePlayer(player)}>❌</button>
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
</section>
