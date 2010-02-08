<h3><?php echo Lang::get('Reviews for this Site'); ?></h3>

<ol>
	<?php foreach ($reviews as $review) { ?>
		<li id="site-review-<?php echo $review['site_reviews_id']; ?>"<?php if ($review['karma'] < 1) { ?> class="spam"<?php } ?>>
			<h4>
				<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $review['email_md5']; ?>" alt="" /> 
				<?php if($review['website']) { ?>
					<a href="<?php echo $review['website']; ?>">
						<?php echo escHTML($review['author']); ?>
					</a>
				<?php } else { ?>
					<?php echo escHTML($review['author']); ?>
				<?php } ?>
			</h4>

			<p>
				<small>
					<a href="#site-review-<?php echo $review['site_reviews_id']; ?>">
						<?php echo Lang::get('Published'); ?> 
						<?php echo date(Config::get('general.date_format'), strtotime($review['pub_date'])); ?>
					</a>
				</small>
			</p>

			<p>
				<img src="<?php echo Router::urlForFile('stars-' . $review['rating']); ?>" alt="<?php echo escHTML($review['author']); ?> <?php echo Lang::get('rated this site a'); ?> <?php echo $review['rating']; ?>/5"/>
			</p>

			<ul>
				<li>
					<?php echo $review['thumbs_up']; ?> <?php echo Lang::get('thumbs up'); ?>.

					<form method="post" action="">
						<p>
							<input type="hidden" name="site_reviews_thumbs_up_submit" value="1"/>
							<input type="hidden" name="site_reviews_id" value="<?php echo $review['site_reviews_id']; ?>"/>
							<input type="submit" value="<?php echo Lang::get('Give this review a thumbs up'); ?>"/>
						</p>
					</form>
				</li>
				<li>
					<?php echo $review['thumbs_down']; ?> <?php echo Lang::get('thumbs down'); ?>.

					<form method="post" action="">
						<p>
							<input type="hidden" name="site_reviews_thumbs_down_submit" value="1"/>
							<input type="hidden" name="site_reviews_id" value="<?php echo $review['site_reviews_id']; ?>"/>
							<input type="submit" value="<?php echo Lang::get('Give this review a thumbs down'); ?>"/>
						</p>
					</form>
				</li>
			</ul>

			<?php echo NiceString::makeNice($review['content'], 5); ?>

		<!--	<h5><?php echo Lang::get('Comment on this Review'); ?></h5>

			<?php echo $review['post_comment_form_html']; ?>

			<?php if (count($review['comments'])) { ?>
				<h5><?php echo Lang::get('Comments on this Review'); ?></h5>

				<ul>
					<?php foreach ($review['comments'] as $comment) { ?>
						<li>
							<?php echo NiceString::makeNice($comment['content'], 5); ?> 
							<?php echo Lang::get('by'); ?> 
							<?php echo escHTML($comment['author']); ?>
						</li>
					<?php } ?>
				</ul>
			<?php } ?> -->
		</li>
	<?php } ?>
</ol>
