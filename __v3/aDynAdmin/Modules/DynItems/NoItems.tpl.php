<p>
	<?php echo Lang::get("It appears you don't have any %0 yet, why not", array(strtolower($table['title']))); ?> 
	<a href="<?php echo Router::urlFor('AddDynItem', array('table_name' => $table['name'])); ?>">
		<?php echo Lang::get('add some'); ?>
	</a>?
</p>
