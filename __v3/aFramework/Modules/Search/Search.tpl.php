<form method="get" action="<?php echo Router::urlFor('SearchResults'); ?>">

	<p>
		<label for="q">Enter search terms</label><br />
		<input type="text" name="q" id="q" value="<?php echo @$_GET['q']; ?>"/> <input type="submit" value="Go" />
	</p>

</form>