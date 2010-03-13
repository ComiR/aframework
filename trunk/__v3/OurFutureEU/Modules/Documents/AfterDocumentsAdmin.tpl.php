<h4><?php echo Lang::get('Upload a Document'); ?></h4>

<form method="post" action="" enctype="multipart/form-data">

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

</form>
