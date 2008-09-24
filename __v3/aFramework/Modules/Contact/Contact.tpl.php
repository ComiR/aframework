<?php if($contact['error']) { ?>
	<p><strong>The form contains error(s), please make sure you've filled out all the mandatory fields correctly.</strong></p>
<?php } ?>

<form method="post" action="">

	<p>
		<label for="contact-name"><strong>*</strong> Your Name</label><br />
		<input type="text" name="name" id="contact-name" value="<?php echo $visitor['name']; ?>" />
	</p>

	<p>
		<label for="contact-email"><strong>*</strong> Your E-mail</label><br />
		<input type="text" name="email" id="contact-email" value="<?php echo $visitor['email']; ?>" />
	</p>

	<p>
		<label for="contact-message"><strong>*</strong> Message</label><br />
		<textarea name="message" id="contact-message" rows="6" cols="40"></textarea>
	</p>

	<p>
		<input type="checkbox" name="remember" id="contact-remember"<?php echo($visitor['remembered']) ? 'checked="checked"' : ''; ?> /> <label for="contact-remember">Remember Me</label>
	</p>

	<p>
		<input type="hidden" name="contact_submit" value="1" />
		<input type="submit" value="Send!" />
	</p>

</form>