<?php if ( $errors ) { ?>
	<p>
		<strong>
			<?php echo Lang::get('the_form_contains_errors'); ?> 
			<?php echo Lang::get('please_make_sure_you_have_filled_out_everything_correctly'); ?>
		</strong>
	</p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('url_string'); ?><br />
			<input type="text" name="url_str" value="<?php echo htmlentities($page['url_str']); ?>" />
		</label>
	</p>

	<p>
		<?php echo Lang::get('show_in_navigation'); ?><br />
		<label>
			<input type="radio" name="in_navigation" value="1"<?php if ( $page['priority'] ) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('yes'); ?>
		</label> 
		<label>
			<input type="radio" name="in_navigation" value="0"<?php if ( !$page['priority'] ) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('no'); ?>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('priority'); ?> (<?php echo Lang::get('a_lower_number_places_page_early_in_the_list'); ?>)<br />
			<input type="text" name="priority" value="<?php echo htmlentities($page['priority']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('page_title'); ?><br />
			<input type="text" name="title" value="<?php echo htmlentities($page['title']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('meta_description'); ?><br />
			<textarea name="meta_description" rows="3" cols="60"><?php echo htmlentities($page['meta_description']); ?></textarea>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('meta_keywords'); ?><br />
			<input type="text" name="meta_keywords" value="<?php echo htmlentities($page['meta_keywords']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('page_content'); ?><br />
			<textarea name="content" rows="20" cols="60"><?php echo htmlentities($page['content']); ?></textarea>
		</label>
	</p>

	
	<p>
		<input type="hidden" name="pages_id" value="<?php echo $page['pages_id']; ?>" />
		<input type="hidden" name="page_submit" value="1" />
		<input type="submit" name="insert" value="<?php echo $page['pages_id'] ? Lang::get('save_changes') : Lang::get('add_page'); ?>" />
		<?php if ( $page['pages_id'] ) { ?>
			 <?php echo Lang::get('or'); ?> 
			<input type="submit" name="page_delete" value="<?php echo Lang::get('delete_this_page'); ?>" />
		<?php } ?>
	</p>

</form>