<?php
	return array(
		'/' . Lang::get('url.dynadmin') . '/'								=> 'DynAdmin', 
		'/' . Lang::get('url.dynadmin') . '/:table_name/'					=> 'DynItems', 
		'/' . Lang::get('url.dynadmin') . '/:table_name/add/'				=> 'AddDynItem', 
		'/' . Lang::get('url.dynadmin') . '/:table_name/:item_id([0-9]+)/'	=> 'DynItem'
	);
?>
