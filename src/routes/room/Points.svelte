<script>
	import { socket } from '$lib/game-state.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let playerId;
	onMount(() => {
		playerId = localStorage.getItem('playerId');
		if (!playerId) {
			console.error('No playerId found.');
		}
	});

	const { data } = $props();
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

<div>
	{#each data as point, index (index)}
		<button onclick={() => updateEstimate(point)}>{point}</button>
	{/each}
</div>