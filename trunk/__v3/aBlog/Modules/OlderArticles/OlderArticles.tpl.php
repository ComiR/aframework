<ol>
	<?php foreach ( $articles as $a ) { ?>
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

			<?php echo NiceString::makeNice($a['content'], 3, false, 250); ?>

			<p>
				<a href="<?php echo Router::urlFor('Article', $a); ?>">
					<?php echo Lang::get('continue_reading'); ?>
				</a>
			</p>
		</li>
	<?php } ?>
</ol>