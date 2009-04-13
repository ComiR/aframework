<?php
	return array(
		'/' . Lang::get('Url.archives') . '/'																=> 'Archives', 
		'/' . Lang::get('Url.archives') . '/:year([0-9]{4,4})/'												=> 'ArticlesByYear', 
		'/' . Lang::get('Url.archives') . '/:year([0-9]{4,4})/:month([0-9]{2,2})/'							=> 'ArticlesByMonth', 
		'/' . Lang::get('Url.archives') . '/:year([0-9]{4,4})/:month([0-9]{2,2})/:day([0-9]{2,2})/'			=> 'ArticlesByDay', 
		'/' . Lang::get('Url.archives') . '/:year([0-9]{4,4})/:month([0-9]{2,2})/:day([0-9]{2,2})/:url_str/'=> 'Article', 
		'/' . Lang::get('Url.archives') . '/:url_str/'														=> 'ArticlesByTag'
	);
?>