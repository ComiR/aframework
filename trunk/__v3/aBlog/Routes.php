<?php
	return array(
		'/'																				=> 'Home', 
		'/search/'																		=> 'Search',
		'/archives/'																	=> 'Archives', 
		'/archives/:year([0-9]{4,4})/'													=> 'ArticleListing', 
		'/archives/:year([0-9]{4,4})/:month([0-9]{2,2})/'								=> 'ArticleListing', 
		'/archives/:year([0-9]{4,4})/:month([0-9]{2,2})/:day([0-9]{2,2})/'				=> 'ArticleListing', 
		'/archives/:year([0-9]{4,4})/:month([0-9]{2,2})/:day([0-9]{2,2})/:url_str/'		=> 'Article', 
		'/archives/:url_str/'															=> 'ArticleListing',
		'/:url_str/'																	=> 'Page'
	);
?>