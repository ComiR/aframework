<h2>
	<?php echo Lang::get('Search Results for'); ?> 
	&quot;<?php echo htmlentities($_GET['q']); ?>&quot;
</h2>

<p>
	<?php echo Lang::get('Results'); ?> 
	<strong><?php echo "$start - $num_results"; ?></strong> 
	<?php echo Lang::get('of about'); ?> 
	<strong><?php echo $total_num_results; ?></strong> 
	<?php echo Lang::get('for'); ?> 
	&quot;<strong><?php echo @htmlentities($_GET['q']); ?></strong>&quot;
</p>