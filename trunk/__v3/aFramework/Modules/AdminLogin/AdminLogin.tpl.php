<h2><?php echo Lang::get('please_sign_in'); ?></h2>

<?php if ($error) { ?>
	<p>
		<strong>
			<?php echo Lang::get('wrong_username_or_password'); ?> 
			<?php echo Lang::get('please_try_again'); ?>
		</strong>
	</p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<?php echo Lang::get('username'); ?>:<br />
			<input type="text" name="username" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('password'); ?>:<br />
			<input type="password" name="password" />
		</label>
	</p>

	<p>
		<label>
			<input type="checkbox" name="remember_login" /> 
			<?php echo Lang::get('remember_me'); ?>
		</label>
	</p>

	<p>
		<input type="hidden" name="admin_login_submit" value="1" />
		<input type="submit" value="<?php echo Lang::get('login'); ?>" />
	</p>

</form>