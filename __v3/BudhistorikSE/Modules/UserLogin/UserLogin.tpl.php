<h2><?php echo Lang::get('Please Sign In'); ?></h2>

<form method="post" action="">

	<p>
		<label>
			<?php echo Lang::get('Username'); ?>:<br />
			<input type="text" name="username" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Password'); ?>:<br />
			<input type="password" name="password" />
		</label>
	</p>

	<p>
		<input type="hidden" name="user_login_submit" value="1" />
		<input type="submit" value="<?php echo Lang::get('Login'); ?>" />
	</p>

</form>
