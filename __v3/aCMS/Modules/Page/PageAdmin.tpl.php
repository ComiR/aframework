<?php if ($errors) { ?>
	<p>
		<strong>
			<?php echo Lang::get('The form contains errors'); ?> 
			<?php echo Lang::get('Please make sure you have filled out everything correctly'); ?>
		</strong>
	</p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Url string'); ?><br />
			<input type="text" name="url_str" value="<?php echo htmlentities($page['url_str']); ?>" />
		</label>
	</p>

	<p>
		<?php echo Lang::get('Show in navigation'); ?><br />
		<label>
			<input type="radio" name="in_navigation" value="1"<?php if ($page['priority']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('Yes'); ?>
		</label> 
		<label>
			<input type="radio" name="in_navigation" value="0"<?php if (!$page['priority']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('No'); ?>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Priority'); ?> (<?php echo Lang::get('A lower number places page early in the list'); ?>)<br />
			<input type="text" name="priority" value="<?php echo htmlentities($page['priority']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Page title'); ?><br />
			<input type="text" name="title" value="<?php echo htmlentities($page['title']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Meta description'); ?><br />
			<textarea name="meta_description" rows="3" cols="60"><?php echo htmlentities($page['meta_description']); ?></textarea>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Meta keywords'); ?><br />
			<input type="text" name="meta_keywords" value="<?php echo htmlentities($page['meta_keywords']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Page content'); ?><br />
			<textarea name="content" rows="20" cols="60"><?php echo htmlentities($page['content']); ?></textarea>
		</label>
	</p>

	
	<p>
		<input type="hidden" name="pages_id" value="<?php echo $page['pages_id']; ?>" />
		<input type="hidden" name="page_submit" value="1" />
		<input type="submit" name="insert" value="<?php echo $page['pages_id'] ? Lang::get('Save changes') : Lang::get('Add page'); ?>" />
		<?php if ( $page['pages_id'] ) { ?>
			 <?php echo Lang::get('Or'); ?> 
			<input type="submit" name="page_delete" value="<?php echo Lang::get('Delete this page'); ?>" />
		<?php } ?>
	</p>

</form>