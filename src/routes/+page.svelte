<script>
	import { goto } from '$app/navigation';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';

	let hasPreviousSession = $state();

	onMount(() => {
		hasPreviousSession = ['sessionId', 'playerName', 'playerId'].every(key => localStorage.getItem(key));
	});

	function createSession() {
		const sessionId = nanoid(8);
		localStorage.setItem('sessionId', sessionId);

		goto(`/${sessionId}`);
	}

	function continueSession() {
		const sessionId = localStorage.getItem('sessionId');

		goto(`/${sessionId}`);
	}
</script>
<div class="poker-sizing-blurb">
	<h3 class="centered-title">What is Poker Sizing?</h3>
	<p>Poker sizing is a way Agile teams estimate work together. Everyone picks a card with their guess for the task size,
		then reveals it at the same time. It sparks good discussions and helps the team agree on the effort needed.</p>
</div>
<div class="button-group">
	<button onclick={createSession}>New session</button>
	{#if (hasPreviousSession) }
		<button onclick={continueSession}>Continue session</button>
	{/if}
</div>
