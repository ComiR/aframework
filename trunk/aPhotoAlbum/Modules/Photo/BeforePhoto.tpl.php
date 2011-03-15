<h2>
	<a href="<?php echo Router::urlFor('PhotoAlbums'); ?>">
		<?php echo Lang::get('All Photo Albums'); ?>
	</a> &rarr; 
	<a href="<?php echo Router::urlFor('PhotoAlbum', $photo); ?>">
		<?php echo escHTML($photo['album_title']); ?>
	</a> &rarr; <?php echo escHTML($photo['title']); ?>
</h2>
