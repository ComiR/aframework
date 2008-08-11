<h2>Please sign in</h2>

<?php if($error) { ?>
	<p><strong>Wrong user name or password. Please try again.</strong></p>
<?php } ?>

<form method="post" action="<?php echo Router::urlFor('Admin'); ?>">

	<p>
		<label>
			Username:<br />
			<input type="text" name="username" />
		</label>
	</p>

	<p>
		<label>
			Password:<br />
			<input type="password" name="password" />
		</label>
	</p>

	<p>
		<label>
			<input type="checkbox" name="remember_login" /> 
			Remember Me
		</label>
	</p>

	<p>
		<input type="hidden" name="login" value="1" />
		<input type="submit" value="Login" />
	</p>

</form>