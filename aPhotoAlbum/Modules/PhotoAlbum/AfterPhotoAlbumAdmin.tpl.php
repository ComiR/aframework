<h3><?php echo Lang::get('Upload a Photo'); ?></h3>

<form method="post" action="" enctype="multipart/form-data">

	<p>
		<label>
			<?php echo Lang::get('Select photo'); ?><br/>
			<input type="file" name="photo"/>
		</label>
	</p>

	<p>
		<input type="hidden" name="insert_photo" value="1"/>
		<input type="hidden" name="album_name" value="<?php echo $album['name']; ?>"/>
		<input type="submit" value="<?php echo Lang::get('Upload'); ?>"/>
	</p>

</form>
