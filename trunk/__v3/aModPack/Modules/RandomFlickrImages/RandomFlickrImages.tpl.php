<?php $images = Articles::getImages(); ?>

<h2>Random Flickr Images</h2>

<ul>
	<?php foreach ($images as $image) { ?>
		<li>
			<a href="<?php echo $image['url']; ?>">
				<img src="<?php echo $image['src']; ?>" alt="<?php echo $image['description']; ?>"/>
			</a>
		</li>
	<?php } ?>
</ul>
