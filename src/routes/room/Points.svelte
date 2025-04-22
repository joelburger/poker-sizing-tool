<script>
	import { socket } from '$lib/game-state.js';

	const { points, playerId } = $props();

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
	<h2>Points</h2>
	<div class="voting-buttons">
		{#each points as point, index (index)}
			<button onclick={() => updateEstimate(point)}>{point}</button>
		{/each}
	</div>
</section>