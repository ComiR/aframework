<?php if ($errors) { ?>
	<p>
		<strong>
			<?php echo Lang::get('The form contains errors.'); ?> 
			<?php echo Lang::get('Please make sure you have filled out everything correctly.'); ?>
		</strong>
	</p>
<?php } ?>

<form method="post" action="">

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Title'); ?><br />
			<input type="text" name="title" value="<?php echo escHTML($article['title']); ?>"<?php if (!SU and $article['articles_id']) { ?> readonly="readonly"<?php } ?>/>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Slug'); ?><br />
			<input type="text" name="url_str" value="<?php echo escHTML($article['url_str']); ?>"<?php if (!SU and $article['articles_id']) { ?> readonly="readonly"<?php } ?>/>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Publish Date'); ?><br />
			<input type="text" name="pub_date" value="<?php echo empty($article['pub_date']) ? date('Y-m-d H:i:s') : $article['pub_date']; ?>"<?php if (!SU and $article['articles_id']) { ?> readonly="readonly"<?php } ?>/>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Meta Keywords'); ?><br />
			<input type="text" name="meta_keywords" value="<?php echo escHTML($article['meta_keywords']); ?>"<?php if (!SU and $article['articles_id']) { ?> readonly="readonly"<?php } ?>/>
		</label>
	</p>

	<p>
		<label>
			<?php echo Lang::get('Meta Description'); ?><br />
			<textarea name="meta_description" rows="3" cols="40"<?php if (!SU and $article['articles_id']) { ?> readonly="readonly"<?php } ?>><?php echo escHTML($article['meta_description']); ?></textarea>
		</label>
	</p>

	<p>
		<label>
			<strong>*</strong> <?php echo Lang::get('Article Content'); ?><br />
			<textarea name="content" rows="20" cols="60"<?php if (!SU and $article['articles_id']) { ?> readonly="readonly"<?php } ?>><?php echo escHTML($article['content']); ?></textarea>
		</label>
	</p>

	<?php
		$tags = array();

		foreach ($article['tags'] as $tag) {
			$tags[] = $tag['title'];
		}

		$tags = implode(', ', $tags);
	?>

	<p>
		<label>
			<?php echo Lang::get('Tags'); ?> <small>(<?php echo Lang::get('Use a comma (,) to separate tags'); ?>)</small><br />
			<input type="text" name="tags" value="<?php echo escHTML($tags); ?>"<?php if (!SU and $article['articles_id']) { ?> readonly="readonly"<?php } ?>/>
		</label>
	</p>

	<p>
		<?php echo Lang::get('Allow Comments'); ?><br />
		<label>
			<input type="radio" name="allow_comments" value="1"<?php if ($article['allow_comments']) { ?> checked="checked"<?php } ?><?php if (!SU and $article['articles_id']) { ?> disabled="disabled"<?php } ?>/> 
			<?php echo Lang::get('Yes'); ?>
		</label> 
		<label>
			<input type="radio" name="allow_comments" value="0"<?php if (!$article['allow_comments']) { ?> checked="checked"<?php } ?><?php if (!SU and $article['articles_id']) { ?> disabled="disabled"<?php } ?>/> 
			<?php echo Lang::get('No'); ?>
		</label>
	</p>

	<p>
		<?php echo Lang::get('Allow Rating'); ?><br />
		<label>
			<input type="radio" name="allow_rating" value="1"<?php if ($article['allow_rating']) { ?> checked="checked"<?php } ?><?php if (!SU and $article['articles_id']) { ?> disabled="disabled"<?php } ?>/> 
			<?php echo Lang::get('Yes'); ?>
		</label> 
		<label>
			<input type="radio" name="allow_rating" value="0"<?php if (!$article['allow_rating']) { ?> checked="checked"<?php } ?><?php if (!SU and $article['articles_id']) { ?> disabled="disabled"<?php } ?>/> 
			<?php echo Lang::get('No'); ?>
		</label>
	</p>

	<p>
		<input type="hidden" name="articles_id" value="<?php echo $article['articles_id']; ?>" />
		<input type="hidden" name="article_submit" value="1" />
		<input type="submit" name="insert" value="<?php echo $article['articles_id'] ? Lang::get('Save Changes') : Lang::get('Add Article'); ?>" />
		<?php if ($article['articles_id'] and SU) { ?>
			 <?php echo Lang::get('or'); ?> 
			<input type="submit" name="article_delete" value="<?php echo Lang::get('Delete this Article'); ?>" />
		<?php } ?>
	</p>

</form>
