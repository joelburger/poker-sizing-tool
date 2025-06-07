<script>
	export let avatars = [
		'/avatars/bot-1.png',
		'/avatars/bot-2.png',
		'/avatars/bot-3.png',
		'/avatars/bot-4.png',
		'/avatars/bot-5.png',
		'/avatars/bot-6.png',
		'/avatars/bot-7.png',
		'/avatars/bot-8.png',
		'/avatars/bot-9.png',
		'/avatars/bot-10.png',
		'/avatars/bot-11.png',
		'/avatars/bot-12.png',
		'/avatars/bot-13.png',
		'/avatars/bot-14.png',
		'/avatars/bot-15.png',
		'/avatars/bot-16.png',
		'/avatars/bot-17.png',
		'/avatars/bot-18.png',
		'/avatars/bot-19.png',
		'/avatars/bot-20.png'];
</script>

<div class="avatar-grid">
	{#each avatars as avatar}
		<label class="avatar-option">
			<input type="radio" name="avatar" value={avatar} />
			<img src={avatar} alt="Avatar" />
		</label>
	{/each}
</div>