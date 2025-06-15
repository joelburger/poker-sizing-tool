<script>
	import { goto } from '$app/navigation';

	let selectedTab = $state('people');
	const animalAvatars = Array.from({ length: 28 }, (_, i) => `animals/${i + 1}.png`);
	const peopleAvatars = Array.from({ length: 28 }, (_, i) => `people/${i + 1}.png`);

	const { data } = $props();

	function selectAvatar(avatar) {
		localStorage.setItem('avatar', avatar);
		goto(`/${data.SESSION_ID}`);
	}
</script>
<h2>Select an avatar</h2>
<div style="margin-bottom: 1rem;">
	<button
		onclick={() => (selectedTab = 'people')}
		class:selected={selectedTab === 'people'}
		class="tab-button"
	>
		People
	</button>
	<button
		onclick={() => (selectedTab = 'animals')}
		class:selected={selectedTab === 'animals'}
		class="tab-button"
	>
		Animals
	</button>
</div>
<div class="avatar-grid">
	{#if selectedTab === 'people'}
		{#each peopleAvatars as avatar}
			<label class="avatar-option">
				<button onclick={() => selectAvatar(avatar)}>
					<img src={`/avatars/${avatar}`} alt={avatar} />
				</button>
			</label>
		{/each}
	{:else if selectedTab === 'animals'}
		{#each animalAvatars as avatar}
			<label class="avatar-option">
				<button onclick={() => selectAvatar(avatar)}>
					<img src={`/avatars/${avatar}`} alt={avatar} />
				</button>
			</label>
		{/each}
	{/if}
</div>