<script>
	import { socket } from '$lib/game-state.js';

	const { points, playerId, currentVote } = $props();

	function updateEstimate(value) {
		console.log(`Player ${playerId} estimates the story at ${value}`);
		socket.send(JSON.stringify({
			eventType: 'update-estimate',
			payload: {
				playerId,
				estimate: value
			}
		}));
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