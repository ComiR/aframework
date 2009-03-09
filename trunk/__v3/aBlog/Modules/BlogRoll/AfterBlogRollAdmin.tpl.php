<h3><?php echo Lang::get('add_a_link'); ?></h3>

<?php if ( $errors ) { ?>
	<p>
		<strong>
			<?php echo Lang::get('the_form_contains_errors'); ?> 
			<?php echo Lang::get('please_make_sure_you_have_filled_out_everything_correctly'); ?>
		</strong>
	</p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<?php echo Lang::get('title'); ?><br />
			<input type="text" name="title" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('description'); ?><br />
			<input type="text" name="description" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('url'); ?><br />
			<input type="text" name="url" />
		</label>
	</p>

	<p>
		<input type="hidden" name="blog_roll_add" value="1" />
		<input type="submit" value="<?php echo Lang::get('add'); ?>" />
	</p>

</form>