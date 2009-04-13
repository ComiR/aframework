<h2>
	<?php echo Lang::get('Search results for'); ?> 
	&quot;<?php echo htmlentities($_GET['q']); ?>&quot;
</h2>

<p>
	<?php echo Lang::get('Results'); ?> 
	<strong><?php echo "$start - $num_results"; ?></strong> 
	<?php echo Lang::get('Of about'); ?> 
	<strong><?php echo $total_num_results; ?></strong> 
	<?php echo Lang::get('For'); ?> 
	&quot;<strong><?php echo @htmlentities($_GET['q']); ?></strong>&quot;
</p>