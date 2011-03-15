<form method="post" action="">

	<p>
		<label>
			<?php echo Lang::get('Introductionary Text'); ?><br/>
			<textarea name="content" rows="10" cols="60"><?php echo escHTML($page['content']); ?></textarea>
		</label>
	</p>

	<p>
		<input type="hidden" name="intro_text_submit" value="1"/>
		<input type="submit" value="<?php echo Lang::get('Save Changes'); ?>"/>
	</p>

</form>
