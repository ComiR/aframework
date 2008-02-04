<?php if($contact['error']) { ?>
	<p><strong>The form contains error(s), please make sure you've filled out all the mandatory fields correctly.</strong></p>
<?php } ?>

<form method="post" action="/mod/Contact/">

	<p>
		<label>
			<strong>*</strong> Your Name:<br />
			<input type="text" name="name" value="<?php echo $visitor['name']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> Your Email:<br />
			<input type="text" name="email" value="<?php echo $visitor['email']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> Your Message:<br />
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
		<input type="hidden" name="send_message" value="1" />
		<input type="submit" value="Send!" />
	</p>

</form>