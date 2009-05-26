<h3><?php echo Lang::get('Add a Link'); ?></h3>

<?php if ($errors) { ?>
	<p>
		<strong>
			<?php echo Lang::get('The form contains errors.'); ?> 
			<?php echo Lang::get('Please make sure you have filled out everything correctly'); ?>
		</strong>
	</p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<?php echo Lang::get('Title'); ?><br />
			<input type="text" name="title" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Description'); ?><br />
			<input type="text" name="description" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('URL'); ?><br />
			<input type="text" name="url" />
		</label>
	</p>

	<p>
		<input type="hidden" name="random_links_add" value="1" />
		<input type="submit" value="<?php echo Lang::get('Add'); ?>" />
	</p>

</form>