<script>

	import { onMount } from 'svelte';
	import { socket } from '$lib/game-state.js';
	import { goto } from '$app/navigation';

	let playerId = $state();
	let playerName = $state('batman');

	onMount(() => {
		playerId = localStorage.getItem('playerId');

		if (!playerId) {
			playerId = crypto.randomUUID();

			localStorage.setItem('playerId', playerId);
		}
	});

	function joinRoom() {
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify({
				eventType: 'join-room',
				payload: {
					playerId,
					playerName
				}
			}));
			goto('/room');
		}
	}
</script>

<h1>Lobby</h1>
<form on:submit|preventDefault={joinRoom}>
	<label for="playerName">Player ({playerId}):</label>
	<input type="text" name="playerName" bind:value={playerName} required />

	<button type="submit">Join</button>
</form>
