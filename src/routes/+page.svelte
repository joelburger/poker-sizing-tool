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
		if (playerName) {

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
	}

	function validateInput(event) {
		const value = event.target.value;
		playerName = value.replace(/[^a-zA-Z]/g, '').slice(0, 20);
	}
</script>
<div class="input-container">
	<div class="avatar">
		<svg viewBox="0 0 24 24" fill="currentColor" class="avatar-icon">
			<path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
		</svg>
	</div>
	<input type="text" name="playerName" bind:value={playerName} required
				 class="name-input" oninput={validateInput} placeholder="Enter name" />
</div>
<br />
<div class="button-group">
	<button type="submit" onclick={()=> joinRoom()}>Join</button>
</div>
