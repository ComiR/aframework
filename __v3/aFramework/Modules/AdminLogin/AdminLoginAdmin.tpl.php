<h2><?php echo Lang::get('you_are_logged_in'); ?></h2>

<p><?php echo Lang::get('what_would_you_like_to_do'); ?></p>

<ul>
	<li><a href="?logout"><?php echo Lang::get('log_out'); ?></a></li>
	<li><a href="<?php echo Router::urlFor('Home'); ?>"><?php echo Lang::get('go_to_home_page'); ?></a></li>
</ul>