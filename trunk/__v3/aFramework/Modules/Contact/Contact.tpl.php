<?php if ($error) { ?>
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
			<strong>*</strong> <?php echo Lang::get('your_name'); ?><br />
			<input type="text" name="name" value="<?php echo $visitor['name']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('your_email'); ?><br />
			<input type="text" name="email" value="<?php echo $visitor['email']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('message'); ?><br />
			<textarea name="message" rows="6" cols="40"></textarea>
		</label>
	</p>

	<p>
		<label>
			<input type="checkbox" name="remember"<?php echo($visitor['remembered']) ? 'checked="checked"' : ''; ?> /> 
			<?php echo Lang::get('remember_me'); ?>
		</label>
	</p>

	<p>
		<input type="hidden" name="contact_submit" value="1" />
		<input type="submit" value="<?php echo Lang::get('send'); ?>" />
	</p>

</form>