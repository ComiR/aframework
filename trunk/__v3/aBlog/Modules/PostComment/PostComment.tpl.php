<form method="post" action="">

	<p>
		<label>
			<strong>*</strong> 
			<?php echo Lang::get('Your Name'); ?><br />
			<input type="text" name="author" value="<?php echo $visitor['name']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('E-mail'); ?><br />
			<input type="text" name="email" value="<?php echo $visitor['email']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Website'); ?><br />
			<input type="text" name="website" value="<?php echo $visitor['url']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> 
			<?php echo Lang::get('And Comment'); ?><br />
			<textarea name="content" rows="10" cols="40"></textarea>
		</label>
	</p>

	<p>
		<label>
			<input type="checkbox" name="remember_visitor_data"<?php echo($visitor['remembered']) ? 'checked="checked"' : ''; ?> /> 
			<?php echo Lang::get('Remember Me'); ?>
		</label>
	</p>

	<p>
		<input type="hidden" name="post_comment_submit" value="<?php echo $articles_id; ?>" />
		<input type="hidden" name="articles_id" value="<?php echo $articles_id; ?>" />
		<input type="submit" value="<?php echo Lang::get('Post Comment'); ?>" />
	</p>

</form>
