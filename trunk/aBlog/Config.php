<?php
	Config::set('ablog',						array(
													'title'			=> 'aBlog', 
													'description'	=> 'General settings for aBlog, used by different aBlog-modules.'
												));
	Config::set('ablog.num_recent_comments',	array(
													'value'			=> 4, 
													'title'			=> 'Number of recent comments'
												));
	Config::set('ablog.num_random_images',		array(
													'value'			=> 12, 
													'title'			=> 'Number of random images'
												));
	Config::set('ablog.num_random_links',		array(
													'value'			=> 4, 
													'title'			=> 'Number of random links'
												));
	Config::set('ablog.num_recent_articles',	array(
													'value'			=> 8, 
													'title'			=> 'Number of recent articles on first page'
												));
	Config::set('ablog.num_older_articles',		array(
													'value'			=> 4, 
													'title'			=> 'Number of older articles below latest article'
												));
	Config::set('ablog.comment_spam_time',		array(
													'value'			=> 5, 
													'title'			=> 'Minutes users need to wait between comments'
												));
	Config::set('navigation.archives',			array(
													'value'			=> true, 
													'description'	=> 'true/false', 
												));

	Config::set('general.site_title',			'aBlog');
	Config::set('general.site_tagline',			'Just another blogging software.');
?>
