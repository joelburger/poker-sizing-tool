<script>
	import { sendMessage } from '$lib/game-state.js';

	const { points, playerId, currentVote, socketUrl, sessionId } = $props();

	async function updateEstimate(value) {
		console.log(`Player ${playerId} estimates the story at ${value}`);
		await sendMessage(socketUrl, {
			eventType: 'update-estimate',
			payload: {
				sessionId,
				playerId,
				estimate: value
			}
		});
	}
</script>
<section aria-label="Voting Buttons">
	<div class="voting-buttons">
		{#each points as point, index (index)}
			<button
				class:selected={currentVote === point}
				onclick={() => updateEstimate(point)}>{point}</button>
		{/each}
	</div>
</section>