<script>
	import Points from './Points.svelte';
	import Players from './Players.svelte';
	import { goto } from '$app/navigation';
	import { room, fetchSocket } from '$lib/game-state.js';
	import { onMount } from 'svelte';
	import Summary from './Summary.svelte';

	const { data } = $props();
	const socket = fetchSocket(data.WS_SERVER_URL);
	let playerId = $state();
	let playerList = $state([]);
	let status = $state();
	let summary = $state();
	let currentVote = $state();

	function isPlayerInTheRoom(playerId, playerList) {
		if (!playerList || playerList.length === 0) {
			return false;
		}
		return playerList.some(player => player.id === playerId);
	}

	onMount(() => {
		playerId = localStorage.getItem('playerId');
		if (status !== null) {
			console.error('Invalid room status');
		}
	});

	room.subscribe((roomState) => {
		playerList = roomState.playerList;
		status = roomState.status;
		summary = roomState.summary;
		currentVote = playerList?.find(player => player.id === playerId)?.estimate || null;
	});

	function goToLobby() {
		goto('/');
	}

	function resetRoom() {
		socket.send(JSON.stringify({
			eventType: 'reset-room',
			payload: {
				playerId
			}
		}));
	}

</script>

{#if status && isPlayerInTheRoom(playerId, playerList)}
	{#if status === 'PENDING' && playerList?.length > 0}
		<Points points={[1,2,3,5,8,13]} playerId={playerId} currentVote={currentVote} socket={socket} />
	{/if}

	<Players playerList={playerList} roomStatus={status} playerId={playerId} socket={socket} />

	{#if status === 'COMPLETED' && playerList?.length > 0}
		<Summary summary={summary} />
	{/if}

	<div class="button-group">
		{#if playerList?.length === 0}
			<button onclick={goToLobby}>Go back to lobby</button>
		{:else}
			{#if status === 'PENDING'}
				<button onclick={goToLobby}>Change name</button>
			{/if}
			<button onclick={resetRoom}>Reset voting</button>
		{/if}
	</div>
{:else}
	<p>Session disconnected</p>

	<div class="button-group">
		<button onclick={goToLobby}>Go back to lobby</button>
	</div>
{/if}



