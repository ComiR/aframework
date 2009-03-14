<form method="get" action="<?php echo Router::urlFor('SearchResults'); ?>">

	<p>
		<label for="q"><?php echo Lang::get('search_terms'); ?></label><br />
		<input type="text" name="q" id="q" value="<?php echo @$_GET['q']; ?>" title="<?php echo Lang::get('search_terms'); ?>..." /> 
		<input type="submit" value="<?php echo Lang::get('find'); ?>" />
	</p>

</form>
