<script>

	const { summary } = $props();

</script>

<section aria-label="Summary">
	<h2>Summary</h2>
	<table class="summary-table">
		<tbody>
		<tr>
			<td>Mean</td>
			<td>{summary?.mean}</td>
		</tr>
		<tr>
			<td>Median</td>
			<td>{summary?.median}</td>
		</tr>
		</tbody>
	</table>
</section>
