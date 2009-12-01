<form method="post" action="" enctype="multipart/form-data">

	<fieldset>

		<legend><?php echo Lang::get('Upload a Document'); ?></legend>

		<p>
			<label>
				<?php echo Lang::get('Select document'); ?><br />
				<input type="file" name="doc" />
			</label>
		</p>

		<p>
			<input type="hidden" name="upload_document" value="1" />
			<input type="submit" value="Upload" />
		</p>

	</fieldset>

</form>
