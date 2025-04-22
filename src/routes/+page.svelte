<script>

	import { onMount } from 'svelte';
	import { socket } from '$lib/game-state.js';
	import { goto } from '$app/navigation';

	let playerId = $state();
	let playerName = $state();

	onMount(() => {
		playerId = localStorage.getItem('playerId');
		playerName = localStorage.getItem('playerName');
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
			localStorage.setItem('playerName', playerName);
			goto('/room');
		}
	}
</script>

<h2>Lobby</h2>
<form on:submit|preventDefault={joinRoom}>
	<input type="text" name="playerName" bind:value={playerName} placeholder="Enter your name" required class="input-text"/>

	<div class="button-group">
		<button type="submit">Join</button>
	</div>
</form>
