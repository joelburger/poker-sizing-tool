<script>

	import { goto } from '$app/navigation';


	let playerId= $state('123')
	let playerName = $state('batman');

	function joinRoom() {
		const socket = new WebSocket('http://localhost:8080');

		socket.onopen = () => {
			socket.send(JSON.stringify({
				eventType: 'join-room',
				payload: {
					playerId,
					playerName
				}
			}));

			goto('/room');
		};

		socket.onmessage = (message) => {
			console.log('received: ', JSON.stringify(message.data));
		}

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		socket.onclose = (event) => {
			console.log('WebSocket closed:', event.reason);
		};

		goto('/room');

	}
</script>

<h1>Lobby</h1>
<form onsubmit={joinRoom}>
	<label for="playerName">Player:</label>
	<input type="text" name="playerName" bind:value={playerName} required />

	<button type="submit">Join</button>
</form>
