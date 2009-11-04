<h2>
	<?php echo $item[Router::$params['table_name'] . '_id']['value'] ? Lang::get('Edit') : Lang::get('Add'); ?> 
	<?php echo str_replace('_', ' ', preg_replace(array('/ies$/', '/s$/'), array('y', ''), Router::$params['table_name'])); ?>
</h2>
