<?php if($errors) { ?>
	<p><strong>The form contains errors. Please make sure you have filled out everything correctly.</strong></p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<strong>*</strong> URL String<br />
			<input type="text" name="url_str" value="<?php echo htmlentities($url_str); ?>" />
		</label>
	</p>

	<p>
		Show in navigation<br />
		<label><input type="radio" name="in_navigation" value="1"<?php if($priority) { ?> checked="checked"<?php } ?> /> Yes</label> 
		<label><input type="radio" name="in_navigation" value="0"<?php if(!$priority) { ?> checked="checked"<?php } ?> /> No</label>
	</p>

	<p>
		<label>
			Priority (a lower nr places page early in list)<br />
			<input type="text" name="priority" value="<?php echo htmlentities($priority); ?>" />
		</label>
	</p>


	<p>
		<label>
			<strong>*</strong> Page title<br />
			<input type="text" name="title" value="<?php echo htmlentities($title_plain); ?>" />
		</label>
	</p>

	<p>
		<label>
			Meta description<br />
			<textarea name="meta_description" rows="3" cols="60"><?php echo htmlentities($meta_description_plain); ?></textarea>
		</label>
	</p>

	<p>
		<label>
			Meta keywords<br />
			<input type="text" name="meta_keywords" value="<?php echo htmlentities($meta_keywords_plain); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> Content<br />
			<textarea name="content" rows="20" cols="60"><?php echo htmlentities($content_plain); ?></textarea>
		</label>
	</p>

	
	<p>
		<input type="hidden" name="pages_id" value="<?php echo $pages_id; ?>" />
		<input type="hidden" name="page_submit" value="true" />
		<input type="submit" name="insert" value="<?php echo $pages_id ? 'Save changes' : 'Add page'; ?>" /><?php if($pages_id) { ?> or <input type="submit" name="page_delete_submit" value="Delete this page" /><?php } ?>
	</p>

</form>