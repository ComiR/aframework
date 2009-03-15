<h2>
	<a href="<?php echo Router::urlFor('Page', array('url_str' => 'about')); ?>">
		About Me
	</a>
</h2>

<p>
	<a href="<?php echo Router::urlForFile('me.jpg', CURRENT_SITE); ?>">
		<img src="<?php echo Router::urlForFile('me.jpg', CURRENT_SITE); ?>" alt="" />
	</a> I'm a 28 year old, swedish web developer, spare-time php-developer, wanna-be designer and ex-3D-hobbyist. This is my website where I write about stuff that interests me.
</p>

<p>
	Check out the <a href="#latest-article">latest article</a> and post a comment, 
	dig through <a href="<?php echo Router::urlFor('Archives'); ?>">the archives</a> for more to read or 
	check out the <a href="<?php echo Router::urlFor('JqueryPlugins'); ?>">jQuery section</a> for plenty of JS-fun.
</p>

<p>
	<a href="<?php echo Router::urlFor('Page', array('url_str' => 'about')); ?>">
		Read more about me and the site
	</a>
</p>