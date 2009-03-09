<h2>
	<a href="<?php echo Router::urlFor('Page', array('url_str' => 'about')); ?>">
		About Me
	</a>
</h2>

<p>
	<a href="<?php echo Router::urlForFile('me.jpg', CURRENT_SITE); ?>">
		<img src="<?php echo Router::urlForFile('me.jpg', CURRENT_SITE); ?>" alt="" />
	</a> Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Consequeteur ipsumus lorimus. Lorem ipsum dolor sit amet. Consequeteur ipsumus lorimus. Consequeteur ipsumus lorimus.
</p>

<p>Lorem ipsum dolor sit amet. Consequeteur ipsumus lorimus. Lorem ipsum dolor sit amet. Consequeteur ipsumus lorimus. Consequeteur ipsumus lorimus.</p>

<p>
	<a href="<?php echo Router::urlFor('Page', array('url_str' => 'about')); ?>">
		<?php echo Lang::get('continue_reading'); ?>
	</a>
</p>