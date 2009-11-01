<?php if ($error) { ?>
	<p>
		<strong>
			<?php echo Lang::get('The form contains errors.'); ?> 
			<?php echo Lang::get('Please make sure you have filled out everything correctly.'); ?>
		</strong>
	</p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Your Name'); ?><br />
			<input type="text" name="name" value="<?php echo $visitor['name']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('E-mail'); ?><br />
			<input type="text" name="email" value="<?php echo $visitor['email']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('And Message'); ?><br />
			<textarea name="message" rows="6" cols="40"></textarea>
		</label>
	</p>

	<p>
		<label>
			<input type="checkbox" name="remember_visitor_data"<?php echo($visitor['remembered']) ? 'checked="checked"' : ''; ?> /> 
			<?php echo Lang::get('Remember Me'); ?>
		</label>
	</p>

	<p>
		<input type="hidden" name="contact_submit" value="1" />
		<input type="submit" value="<?php echo Lang::get('Send'); ?>" />
	</p>

</form>
