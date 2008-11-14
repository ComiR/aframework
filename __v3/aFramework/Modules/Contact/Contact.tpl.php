<?php if($contact['error']) { ?>
	<p><strong>The form contains error(s), please make sure you've filled out all the mandatory fields correctly.</strong></p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<strong>*</strong> Your Name<br />
			<input type="text" name="name" value="<?php echo $visitor['name']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> Your E-mail<br />
			<input type="text" name="email" value="<?php echo $visitor['email']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> Message<br />
			<textarea name="message" rows="6" cols="40"></textarea>
		</label>
	</p>

	<p>
		<label>
			<input type="checkbox" name="remember"<?php echo($visitor['remembered']) ? 'checked="checked"' : ''; ?> /> 
			Remember Me
		</label>
	</p>

	<p>
		<input type="hidden" name="contact_submit" value="1" />
		<input type="submit" value="Send!" />
	</p>

</form>
