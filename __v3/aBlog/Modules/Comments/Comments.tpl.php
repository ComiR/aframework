<ol>
	<?php foreach ($comments as $c) { ?>
		<li id="comment-<?php echo $c['comments_id']; ?>"<?php if ($c['karma'] < 1) { ?> class="spam"<?php } ?>>
			<h4>
				<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $c['email_md5']; ?>" alt="" /> 
				<?php if($c['website']) { ?>
					<a href="<?php echo $c['clean_website']; ?>">
						<?php echo escHTML($c['author']); ?>
					</a>
				<?php } else { ?>
					<?php echo escHTML($c['author']); ?>
				<?php } ?>
			</h4>

			<p>
				<small>
					<a href="<?php echo Router::urlFor('Article', $c); ?>#comment-<?php echo $c['comments_id']; ?>">
						<?php echo Lang::get('Published'); ?> 
						<?php echo date(Config::get('general.date_format'), strtotime($c['pub_date'])); ?>
					</a>
				</small>
			</p>

			<?php echo NiceString::makeNice($c['content'], 5); ?>

			<?php if (ADMIN) { ?>
				<form method="post" action="">
					<p>
						<input type="hidden" name="comments_id" value="<?php echo $c['comments_id']; ?>" />
						<?php if ($c['karma'] < 1) { ?>
							<input type="submit" name="comments_ham" value="<?php echo Lang::get('Mark as Ham'); ?>" />
						<?php } else { ?>
							<input type="submit" name="comments_spam" value="<?php echo Lang::get('Mark as Spam'); ?>" />
						<?php } ?>
						<?php if (SU) { ?>
							 <?php echo Lang::get('or'); ?> 
							<input type="submit" name="comments_delete" value="<?php echo Lang::get('Delete'); ?>" />
						<?php } ?>
					</p>
				</form>
			<?php } ?>
		</li>
	<?php } ?>
</ol>
