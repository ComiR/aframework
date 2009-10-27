<?php
	return array(
		'/' . Lang::get('url.add-article') . '/'															=> 'AddArticle', 
		'/' . Lang::get('url.archives') . '/'																=> 'Archives', 
		'/' . Lang::get('url.archives') . '/:year([0-9]{4,4})/'												=> 'ArticlesByYear', 
		'/' . Lang::get('url.archives') . '/:year([0-9]{4,4})/:month([0-9]{2,2})/'							=> 'ArticlesByMonth', 
		'/' . Lang::get('url.archives') . '/:year([0-9]{4,4})/:month([0-9]{2,2})/:day([0-9]{2,2})/'			=> 'ArticlesByDay', 
		'/' . Lang::get('url.archives') . '/:year([0-9]{4,4})/:month([0-9]{2,2})/:day([0-9]{2,2})/:url_str/'=> 'Article', 
		'/' . Lang::get('url.archives') . '/:url_str/'														=> 'ArticlesByTag'
	);
?>
