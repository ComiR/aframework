<h2>
	<a href="<?php echo Router::urlFor('Page', array('url_str' => 'about')); ?>">
		About Me
	</a>
</h2>

<p>
	<a href="<?php echo Router::urlForFile('me.jpg', CURRENT_SITE); ?>">
		<img src="<?php echo Router::urlForFile('me.jpg', CURRENT_SITE); ?>" alt="Andreas Lagerkvist" />
	</a> I'm a Swedish <strong>web developer</strong>, spare-time <strong>php-developer</strong>, wanna-be <strong>designer</strong> and <strong>ex-3D-hobbyist</strong>. This is my website where I write about stuff that interests me.
</p>

<p>
	Check out the <strong><a href="#latest-article">latest article</a></strong> and post a comment, 
	dig through <strong><a href="<?php echo Router::urlFor('Archives'); ?>">the archives</a></strong> for more to read or 
	check out the <strong><a href="<?php echo Router::urlFor('JqueryPlugins'); ?>">jQuery section</a></strong> for plenty of JS-fun.
</p>

<p>
	<strong>
		<a href="<?php echo Router::urlFor('Page', array('url_str' => 'about')); ?>">
			Read more about me and the site
		</a>
	</strong>
</p>
