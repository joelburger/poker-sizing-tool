<script>

	import { onMount } from 'svelte';
	import { sendMessage } from '$lib/game-state.js';
	import { goto } from '$app/navigation';

	let playerId = $state();
	let playerName = $state();
	let { data } = $props();
	const socketUrl = data.WS_SERVER_URL;

	onMount(() => {
		playerId = localStorage.getItem('playerId');
		playerName = localStorage.getItem('playerName');
		if (!playerId) {
			playerId = crypto.randomUUID();
			localStorage.setItem('playerId', playerId);
		}
	});

	async function joinRoom() {
		await sendMessage(socketUrl, {
			eventType: 'join-room',
			payload: {
				playerId,
				playerName
			}
		});
		localStorage.setItem('playerName', playerName);
		goto('/room');
	}
</script>
<h2>Lobby</h2>
<input type="text" name="playerName" bind:value={playerName} placeholder="Enter your name" required
			 class="input-text" />

<div class="button-group">
	<button type="submit" onclick={()=> joinRoom()}>Join</button>
</div>
