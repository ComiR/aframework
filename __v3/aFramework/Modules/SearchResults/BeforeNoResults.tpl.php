<h2>
	<?php echo Lang::get('No search results for'); ?> 
	&quot;<?php echo htmlentities($_GET['q']); ?>&quot;
</h2>

<p>
	<?php echo Lang::get('Your search'); ?> - 
	&quot;<strong><?php echo @htmlentities($_GET['q']); ?></strong>&quot; - 
	<?php echo Lang::get('Did not match any documents'); ?>
</p>