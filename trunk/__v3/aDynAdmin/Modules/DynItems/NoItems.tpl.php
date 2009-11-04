<p>
	<?php echo Lang::get('It appears you don\'t have any'); ?> 
	<?php echo strtolower($table['title']); ?> 
	<?php echo Lang::get('yet, why not'); ?> 
	<a href="<?php echo Router::urlFor('AddDynItem', array('table_name' => $table['name'])); ?>">
		<?php echo Lang::get('add some'); ?>
	</a>?
</p>
