<?php if ($album['photos']) { ?>
	<ul>
		<?php foreach ($album['photos'] as $photo) { ?>
			<li>
				<a href="<?php echo Router::urlFor('Photo', $photo); ?>">
					<img src="<?php echo $photo['src_thumb']; ?>" alt=""/><br/>
					<?php echo $photo['title']; ?>
				</a>

				<?php if (SU) { ?>
					<form method="post" action="">
						<p>
							<input type="hidden" name="delete_photo" value="1"/>
							<input type="hidden" name="photo_name" value="<?php echo escHTML($photo['name']); ?>"/>
							<input type="hidden" name="album_name" value="<?php echo escHTML($album['name']); ?>"/>
							<input type="submit" value="<?php echo Lang::get('Delete'); ?>"/>
						</p>
					</form>
				<?php } ?>
			</li>
		<?php } ?>
	</ul>
<?php } else { ?>
	<p><?php echo Lang::get('No photos have been added to this album. Please try again later.'); ?></p>
<?php } ?>
