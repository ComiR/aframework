<ul>
	<?php foreach ($articles as $a) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Article', $a); ?>">
					<?php echo escHTML($a['title']); ?>
				</a>
			</h3>

			<p>
				<small>
					<?php echo Lang::get('Published %0', array(date(Config::get('general.date_format'), strtotime($a['pub_date'])))); ?>
				</small>
			</p>

			<?php echo NiceString::makeNice($a['content'], 4, true, false, true); ?>

			<p>
				<?php if ($a['num_comments']) { ?>
					<?php echo Lang::get('Join %0 others and', array($a['num_comments'])); ?> 
				<?php } else { ?>
					<?php echo Lang::get('Be the first to'); ?> 
				<?php } ?>
				<a href="<?php echo Router::urlFor('Article', $a); ?>#post-comment">
					<?php echo Lang::get('post a comment'); ?>
				</a>
			</p>
		</li>
	<?php } ?>
</ul>
