<h3><?php echo Lang::get('Upload a Comic'); ?></h3>

<form method="post" action="" enctype="multipart/form-data">

	<p>
		<label>
			<?php echo Lang::get('Select Image'); ?><br />
			<input type="file" name="image" />
		</label>
	</p>

	<p>
		<input type="hidden" name="upload_image" value="1" />
		<input type="submit" value="Upload" />
	</p>

</form>
