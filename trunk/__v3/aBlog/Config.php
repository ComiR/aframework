<?php
	Config::set('ablog',						array(
													'title'			=> 'aBlog', 
													'description'	=> 'General settings for aBlog, used by different aBlog-modules.'
												));
	Config::set('ablog.num_recent_stuff',		array(
													'value'			=> 4, 
													'title'			=> 'Number of recent stuff (eg comments)'
												));
	Config::set('ablog.num_recent_articles',	array(
													'value'			=> 8, 
													'title'			=> 'Number of recent articles on first page'
												));
	Config::set('ablog.comment_spam_time',		array(
													'value'			=> 5, 
													'title'			=> 'Minutes users need to wait between comments'
												));
?>
