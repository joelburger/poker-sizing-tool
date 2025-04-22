<script>
	import Points from './Points.svelte';
	import Players from './Players.svelte';
	import { goto } from '$app/navigation';
	import { room, socket } from '$lib/game-state.js';
	import { onMount } from 'svelte';
	import Summary from './Summary.svelte';

	function changeName() {
		goto('/lobby');
	}

	let playerId;
	let playerName;

	let playerList = [];
	let status;
	let summary;

	onMount(() => {
		playerId = localStorage.getItem('playerId');
		playerName = localStorage.getItem('playerName');
		if (status !== null) {
			console.error('Invalid room status');
		}
	});

	function resetRoom() {
		socket.send(JSON.stringify({
			eventType: 'reset-room',
			payload: {
				playerId
			}
		}));
	}


	room.subscribe((roomState) => {
		console.log('room state:', roomState);
		playerList = roomState.playerList;
		status = roomState.status;
		summary = roomState.summary;
	});

</script>

{#if status }

	{#if status === 'PENDING'}
		<Points points={[1,2,3,5,8,13]} playerId={playerId} />
	{/if}

	<Players playerList={playerList} roomStatus={status} playerId={playerId} />

	{#if status === 'COMPLETED'}
		<Summary summary={summary} />
	{/if}

	<div class="button-group">
		{#if status === 'PENDING'}
			<button on:click={changeName}>Change name</button>
		{/if}
		<button on:click={resetRoom}>Reset voting</button>
	</div>
{:else}
	<p>Session disconnected</p>


	<div class="button-group">
		<button on:click={changeName}>Go back to lobby</button>
	</div>
{/if}

