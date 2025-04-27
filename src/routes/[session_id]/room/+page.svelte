<script>
	import Points from './Points.svelte';
	import Players from './Players.svelte';
	import { goto } from '$app/navigation';
	import { room, sendMessage } from '$lib/game-state.js';
	import { onMount } from 'svelte';
	import Summary from './Summary.svelte';

	const { data } = $props();
	const socketUrl = data.WS_SERVER_URL;
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
		goto(`/${data.SESSION_ID}`);
	}

	async function resetRoom() {
		await sendMessage(socketUrl, {
			eventType: 'reset-room',
			payload: {
				sessionId: data.SESSION_ID,
				playerId
			}
		});
	}
</script>

{#if status && isPlayerInTheRoom(playerId, playerList)}
	{#if status === 'PENDING' && playerList?.length > 0}
		<Points points={[1,2,3,5,8,13]} playerId={playerId} currentVote={currentVote} socketUrl={socketUrl} sessionId={data.SESSION_ID} />
	{/if}

	<Players playerList={playerList} roomStatus={status} playerId={playerId} socketUrl={socketUrl} sessionId={data.SESSION_ID} />

	{#if status === 'COMPLETED' && playerList?.length > 0}
		<Summary summary={summary} />
	{/if}

	<div class="button-group">
		{#if playerList?.length === 0}
			<button onclick={goToLobby}>Go back to lobby</button>
		{:else}
			{#if status === 'PENDING'}
				<button onclick={goToLobby}>Go back to lobby</button>
			{/if}
			<button onclick={() => resetRoom()}>Reset voting</button>
		{/if}
	</div>
{:else}
	<p class="centered-title">Session disconnected</p>

	<div class="button-group">
		<button onclick={goToLobby}>Go back to lobby</button>
	</div>
{/if}



