<ul>
	<?php if ($previous_article) { ?>
		<li>
			<a href="<?php echo Router::urlFor('Article', $previous_article); ?>">
				<?php echo escHTML($previous_article['title']); ?>
			</a>
		</li>
	<?php } else { ?>
		<li>
			<?php echo Lang::get('No previous article'); ?>
		</li>
	<?php } if ($next_article) { ?>
		<li>
			<a href="<?php echo Router::urlFor('Article', $next_article); ?>">
				<?php echo escHTML($next_article['title']); ?>
			</a>
		</li>
	<?php } ?>
</ul>
