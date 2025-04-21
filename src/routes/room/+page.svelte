<script>
	import Points from './Points.svelte';
	import Players from './Players.svelte';
	import { goto } from '$app/navigation';
	import { room } from '$lib/game-state.js'

	function changeName() {
		goto('/lobby');
	}

	let playerList = [];

	room.subscribe((value) => {

		console.log('room.subscribe', value);

		playerList = value.playerList;
	})

</script>

<Points data={[1,3,5,8,13]} />

<Players data={playerList} />

<button on:click={changeName}>Change name</button>