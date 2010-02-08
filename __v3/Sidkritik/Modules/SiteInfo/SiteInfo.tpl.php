<h2>
	<a href="<?php echo $site['url']; ?>">
		<?php echo escHTML($site['title']); ?>
	</a>
</h2>

<?php echo NiceString::makeNice($site['content'], 3); ?>

<p>
	<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $site['email_md5']; ?>" alt="" /><br/>
	<?php echo Lang::get('By:'); ?> <?php echo escHTML($site['author']); ?>
</p>

<p>
	<?php if ($site['num_reviews']) { ?>
		<img src="<?php echo Router::urlForFile('stars-' . round($site['avg_rating']) . '.png'); ?>" alt="<?php echo Lang::get('Rating:') . ' ' . $site['avg_rating']; ?>"/> 
		<a href="<?php echo Router::urlFor('Site', $site); ?>#site-reviews">
			<?php echo $site['num_reviews']; ?> <span><?php echo Lang::get('reviews'); ?></span>
		</a>
	<?php } else { ?>
		<a href="<?php echo Router::urlFor('Site', $site); ?>#post-site-review">
			<?php echo Lang::get('Be the first to review this site'); ?>
		</a>
	<?php } ?>
</p>
