<h2><?php echo Lang::get('The Latest Comic'); ?></h2>

<p>
	<a href="<?php echo $image['url']; ?>">
		<img src="<?php echo $image['url']; ?>" alt=""/>
	</a><br/>
	<?php echo Lang::get('by'); ?> <a href="http://www.bonton.se">Hans Lindström</a>
</p>

<p>
	<a href="<?php echo Router::urlFor('Comics'); ?>">
		<?php echo Lang::get('More comics'); ?>
	</a>
</p>
