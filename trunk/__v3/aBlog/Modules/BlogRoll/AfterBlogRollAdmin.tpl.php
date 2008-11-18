<h3>Add a link</h3>

<?php if($errors) { ?>
	<p><strong>The form contains errors. Please make sure you have filled out everything correctly.</strong></p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			Title<br />
			<input type="text" name="title" />
		</label>
	</p>

	<p>
		<label>
			Description<br />
			<input type="text" name="description" />
		</label>
	</p>

	<p>
		<label>
			URL<br />
			<input type="text" name="url" />
		</label>
	</p>

	<p>
		<input type="hidden" name="blog_roll_submit" value="1" />
		<input type="submit" value="Add" />
	</p>

</form>