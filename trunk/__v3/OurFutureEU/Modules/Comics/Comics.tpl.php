<h2><?php echo Lang::get('All Published Comics'); ?></h2>

<ul>
	<?php foreach ($images as $image) { ?>
		<li>
			<a href="<?php echo $image['url']; ?>">
				<img src="<?php echo $image['url']; ?>" alt=""/>
			</a>
		</li>
	<?php } ?>
</ul>

<p>Copyright &copy; <a href="http://www.bonton.se">Hans Lindström</a>.</p>
