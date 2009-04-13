<h2>
	<?php echo Lang::get('No search results for'); ?> 
	&quot;<?php echo htmlentities($_GET['q']); ?>&quot;
</h2>

<p>
	<?php echo Lang::get('Your search'); ?> - 
	&quot;<strong><?php echo @htmlentities($_GET['q']); ?></strong>&quot; - 
	<?php echo Lang::get('Did not match any documents'); ?>
</p>

<h3><?php echo Lang::get('Suggestions'); ?></h3>

<ul>
	<li><?php echo Lang::get('Make sure all your words are spelled correctly'); ?></li>
	<li><?php echo Lang::get('Try different keywords'); ?></li>
	<li><?php echo Lang::get('Try more general keywords'); ?></li>
</ul>