<?php
	return array(
		'/archives/'																=> 'Archives', 
		'/archives/:year([0-9]{4,4})/'												=> 'ArticlesByYear', 
		'/archives/:year([0-9]{4,4})/:month([0-9]{2,2})/'							=> 'ArticlesByMonth', 
		'/archives/:year([0-9]{4,4})/:month([0-9]{2,2})/:day([0-9]{2,2})/'			=> 'ArticlesByDay', 
		'/archives/:year([0-9]{4,4})/:month([0-9]{2,2})/:day([0-9]{2,2})/:url_str/'	=> 'Article', 
		'/archives/:url_str/'														=> 'ArticlesByCategory', 
		'/comments/'																=> 'Comments', 
		'/comments/:md5_email/'														=> 'CommentsByUser'

	);
?>
