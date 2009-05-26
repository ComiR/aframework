<?php if ($errors) { ?>
	<p>
		<strong>
			<?php echo Lang::get('The form contains errors.'); ?> 
			<?php echo Lang::get('Please make sure you have filled out everything correctly'); ?>
		</strong>
	</p>
<?php } elseif ($inserted) { ?>
	<p>
		<strong>
			<?php echo Lang::get('The article was successfully saved!'); ?>
		</strong>
	</p>
<?php } elseif ($deleted) { ?>
	<p>
		<strong>
			<?php echo Lang::get('The article was successfully deleted!'); ?>
		</strong>
	</p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Url string'); ?><br />
			<input type="text" name="url_str" value="<?php echo htmlentities($article['url_str']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Title'); ?><br />
			<input type="text" name="title" value="<?php echo htmlentities($article['title']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Publish date'); ?><br />
			<input type="text" name="pub_date" value="<?php echo $article['pub_date']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Meta description'); ?><br />
			<textarea name="meta_description" rows="3" cols="60"><?php echo htmlentities($article['meta_description']); ?></textarea>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Meta keywords'); ?><br />
			<input type="text" name="meta_keywords" value="<?php echo htmlentities($article['meta_keywords']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Article content'); ?><br />
			<textarea name="content" rows="20" cols="60"><?php echo htmlentities($article['content']); ?></textarea>
		</label>
	</p>

	<p>
		<?php echo Lang::get('Allow comments'); ?><br />
		<label>
			<input type="radio" name="allow_comments" value="1"<?php if ($article['allow_comments']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('Yes'); ?>
		</label> 
		<label>
			<input type="radio" name="allow_comments" value="0"<?php if (!$article['allow_comments']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('No'); ?>
		</label>
	</p>

	<p>
		<?php echo Lang::get('Allow rating'); ?><br />
		<label>
			<input type="radio" name="allow_rating" value="1"<?php if ($article['allow_rating']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('Yes'); ?>
		</label> 
		<label>
			<input type="radio" name="allow_rating" value="0"<?php if (!$article['allow_rating']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('No'); ?>
		</label>
	</p>
	
	<p>
		<input type="hidden" name="articles_id" value="<?php echo $article['articles_id']; ?>" />
		<input type="hidden" name="article_submit" value="1" />
		<input type="submit" name="insert" value="<?php echo $article['articles_id'] ? Lang::get('Save changes') : Lang::get('Add article'); ?>" />
		<?php if ($article['articles_id']) { ?>
			 <?php echo Lang::get('Or'); ?> 
			<input type="submit" name="article_delete" value="<?php echo Lang::get('Delete this article'); ?>" />
		<?php } ?>
	</p>

</form>