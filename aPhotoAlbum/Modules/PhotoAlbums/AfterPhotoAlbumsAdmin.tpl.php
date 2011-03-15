<h3><?php echo Lang::get('Create a New Album'); ?></h3>

<form method="post" action="" enctype="multipart/form-data">

	<p>
		<label>
			<?php echo Lang::get('Album Name'); ?><br/>
			<input type="text" name="album_name"/>
		</label>
	</p>

	<p>
		<input type="hidden" name="insert_album" value="1" />
		<input type="submit" value="<?php echo Lang::get('Create Album'); ?>"/>
	</p>

</form>
