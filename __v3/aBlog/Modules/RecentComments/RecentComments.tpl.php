<ol<?php if ($start > 1) { ?> start="<?php $start; ?>"<?php } ?>>
	<?php foreach ($comments as $c) { ?>
		<li>
			<h3>
				<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $c['email_md5']; ?>" alt="" /> 
				<a href="<?php echo Router::urlFor('Article', $c); ?>#comment-<?php echo $c['comments_id']; ?>">
					<?php echo htmlentities($c['author']); ?>
				</a> <?php echo Lang::get('on'); ?> 
				<a href="<?php echo Router::urlFor('Article', $c); ?>">
					<?php echo htmlentities($c['article_title']); ?>
				</a>
			</h3>

			<?php echo NiceString::makeNice($c['content'], 4, false, 50); ?>

			<?php if (ADMIN) { ?>
				<form method="post" action="">
					<p>
						<input type="hidden" name="recent_comments_delete" value="1" />
						<input type="hidden" name="comments_id" value="<?php echo $c['comments_id']; ?>" />
						<input type="submit" value="<?php echo Lang::get('delete'); ?>" />
					</p>
				</form>
			<?php } ?>
		</li>
	<?php } ?>
</ol>