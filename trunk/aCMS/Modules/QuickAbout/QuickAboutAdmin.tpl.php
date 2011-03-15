<form method="post" action="">

	<p>
		<label>
			<?php echo Lang::get('Short Description of %0', array(Config::get('general.site_title'))); ?><br/>
			<textarea name="content" rows="10" cols="60"><?php echo escHTML($content); ?></textarea>
		</label>
	</p>

	<p>
		<input type="hidden" name="quick_about_update" value="1"/>
		<input type="submit" value="<?php echo Lang::get('Save Changes'); ?>"/>
	</p>

</form>
