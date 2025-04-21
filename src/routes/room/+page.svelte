<script>
	import Points from './Points.svelte';
	import Players from './Players.svelte';
	import { goto } from '$app/navigation';


	function changeName() {
		goto('/lobby');
	}

</script>

<Points data={[1,3,5,8,13]} />

<Players data="{['joel', 'paz', 'anya']}" />


<button on:click={changeName}>Change name</button>