<h2><?php echo Lang::get('You are Logged In'); ?></h2>

<p><?php echo Lang::get('What would you like to do?'); ?></p>

<ul>
	<li><a href="?logout"><?php echo Lang::get('Log out'); ?></a></li>
	<li><a href="<?php echo Router::urlFor('Home'); ?>"><?php echo Lang::get('Go to Home Page'); ?></a></li>
</ul>