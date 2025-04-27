<script>
	import { onMount } from 'svelte';
	import { sendMessage } from '$lib/game-state.js';
	import { goto } from '$app/navigation';

	let copyButtonText = $state('Copy link');
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
					sessionId: data.SESSION_ID,
					playerId,
					playerName
				}
			});
			localStorage.setItem('playerName', playerName);
			goto(`/${data.SESSION_ID}/room`);
		}
	}

	function validateInput(event) {
		const value = event.target.value;
		playerName = value.replace(/[^a-zA-Z]/g, '').slice(0, 20);
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(data.REQUEST_URL);
			copyButtonText = "Link copied";
			setTimeout(() => (copyButtonText = "Copy link"), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	}

</script>

<div class="qr-container">
	<img src={data.QR_CODE} alt="QR Code" />
	<p>Scan the QR code or share this URL to invite others:</p>
	<p><strong>{data.REQUEST_URL}</strong></p>
</div>

<div class="input-container">
	<div class="avatar">
		<img src="/icons/person.svg" alt="Person icon" class="avatar-icon" />
	</div>
	<input type="text" name="playerName" bind:value={playerName} required
				 class="name-input" oninput={validateInput} placeholder="Enter name" />
</div>
<br />
<div class="button-group">
	<button onclick={copyToClipboard}>{copyButtonText}</button>
	<button onclick={()=> joinRoom()}>Continue</button>
</div>
