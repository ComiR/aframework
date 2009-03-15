<ul>
	<?php foreach ($articles as $a) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Article', $a); ?>">
					<?php echo htmlentities($a['title']); ?>
				</a>
			</h3>

			<p>
				<small>
					<?php echo Lang::get('published'); ?> 
					<?php echo date(Config::get('general.date_format'), strtotime($a['pub_date'])); ?>
				</small>
			</p>

			<?php echo NiceString::makeNice($a['content'], 4, false); ?>

			<p>
				<?php if ($a['num_comments']) { ?>
					<?php echo Lang::get('join'); ?> 
					<?php echo $a['num_comments']; ?> 
					<?php echo Lang::get('others_and'); ?> 
				<?php } else { ?>
					<?php echo Lang::get('be_the_first_to'); ?> 
				<?php } ?>
				<a href="<?php echo Router::urlFor('Article', $a); ?>#post-comment">
					<?php echo Lang::get('post_a_comment'); ?>
				</a>
			</p>
		</li>
	<?php } ?>
</ul>