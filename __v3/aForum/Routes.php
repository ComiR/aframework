<?php
	return array(
		'/' . Lang::get('url.forum') . '/'									=> 'Forums', 
		'/' . Lang::get('url.forum') . '/:forum_url_str/'					=> 'Threads', 
		'/' . Lang::get('url.forum') . '/:forum_url_str/:thread_url_str/'	=> 'Thread'
	);
?>
