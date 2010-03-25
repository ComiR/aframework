<h2><?php echo $title; ?></h2>

<ul>
	<?php foreach ($sites as $site) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Site', $site); ?>">
					<img src="<?php echo empty($site['thumb_url']) ? Router::urlForFile('no-thumb.png') : $site['thumb_thumb_url']; ?>" alt="<?php echo escHTML($site['title']); ?>"/>
				</a>
			</h3>

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
		</li>
	<?php } ?>
</ul>
