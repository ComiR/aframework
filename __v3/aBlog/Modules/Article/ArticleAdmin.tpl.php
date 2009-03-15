<?php if ($errors) { ?>
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
			<input type="text" name="url_str" value="<?php echo htmlentities($article['url_str']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('title'); ?><br />
			<input type="text" name="title" value="<?php echo htmlentities($article['title']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('publish_date'); ?><br />
			<input type="text" name="pub_date" value="<?php echo $article['pub_date']; ?>" />
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('meta_description'); ?><br />
			<textarea name="meta_description" rows="3" cols="60"><?php echo htmlentities($article['meta_description']); ?></textarea>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('meta_keywords'); ?><br />
			<input type="text" name="meta_keywords" value="<?php echo htmlentities($article['meta_keywords']); ?>" />
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('article_content'); ?><br />
			<textarea name="content" rows="20" cols="60"><?php echo htmlentities($article['content']); ?></textarea>
		</label>
	</p>

	<p>
		<?php echo Lang::get('allow_comments'); ?><br />
		<label>
			<input type="radio" name="allow_comments" value="1"<?php if ($article['allow_comments']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('yes'); ?>
		</label> 
		<label>
			<input type="radio" name="allow_comments" value="0"<?php if (!$article['allow_comments']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('no'); ?>
		</label>
	</p>

	<p>
		<?php echo Lang::get('allow_rating'); ?><br />
		<label>
			<input type="radio" name="allow_rating" value="1"<?php if ($article['allow_rating']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('yes'); ?>
		</label> 
		<label>
			<input type="radio" name="allow_rating" value="0"<?php if (!$article['allow_rating']) { ?> checked="checked"<?php } ?> /> 
			<?php echo Lang::get('no'); ?>
		</label>
	</p>
	
	<p>
		<input type="hidden" name="articles_id" value="<?php echo $article['articles_id']; ?>" />
		<input type="hidden" name="article_submit" value="1" />
		<input type="submit" name="insert" value="<?php echo $article['articles_id'] ? Lang::get('save_changes') : Lang::get('add_page'); ?>" />
		<?php if ( $article['articles_id'] ) { ?>
			 <?php echo Lang::get('or'); ?> 
			<input type="submit" name="article_delete" value="<?php echo Lang::get('delete_this_article'); ?>" />
		<?php } ?>
	</p>

</form>