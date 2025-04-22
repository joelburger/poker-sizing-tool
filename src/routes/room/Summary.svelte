<script>

	const { summary } = $props();

</script>

<section aria-label="Summary">
	<h2>Summary</h2>
	<div class="summary-columns">
		<div class="summary-item">
			<div class="summary-label">Mean</div>
			<div class="summary-value">{summary?.mean}</div>
		</div>
		<div class="summary-item">
			<div class="summary-label">Median</div>
			<div class="summary-value">{summary?.median}</div>
		</div>
	</div>
</section>
