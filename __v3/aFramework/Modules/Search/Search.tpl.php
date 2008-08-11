<form method="get" action="<?php echo Router::urlFor('Search'); ?>">

	<h2><label for="q">Search</label></h2>

	<p><input type="text" name="q" id="q" value="<?php echo @$_GET['q']; ?>"/> <input type="submit" value="Go" /></p>

</form>