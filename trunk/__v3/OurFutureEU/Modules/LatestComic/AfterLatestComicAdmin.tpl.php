<form method="post" action="" enctype="multipart/form-data">

	<fieldset>

		<legend><?php echo Lang::get('Upload a Comic'); ?></legend>

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

	</fieldset>

</form>
