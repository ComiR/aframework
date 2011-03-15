<?php if ($albums) { ?>
	<ul>
		<?php foreach ($albums as $album) { ?>
			<li>
				<a href="<?php echo Router::urlFor('PhotoAlbum', $album); ?>">
					<img src="<?php echo $album['photos'][0]['src_thumb']; ?>" alt=""/><br/>
					<?php echo escHTML($album['title']); ?>
				</a> (<?php echo $album['photos'] ? count($album['photos']) : 0; ?>)

				<?php if (SU) { ?>
					<form method="post" action="">
						<p>
							<input type="hidden" name="delete_album" value="1"/>
							<input type="hidden" name="album_name" value="<?php echo escHTML($album['name']); ?>"/>
							<input type="submit" value="<?php echo Lang::get('Delete'); ?>"/>
						</p>
					</form>
				<?php } ?>
			</li>
		<?php } ?>
	</ul>
<?php } else { ?>
	<p><?php echo Lang::get('No albums have been added. Please try again later.'); ?></p>
<?php } ?>
