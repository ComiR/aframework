<ol>
	<?php foreach ($articles as $a) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Article', $a); ?>">
					<?php echo escHTML($a['title']); ?>
				</a>
			</h3>

			<p>
				<small>
					<?php echo Lang::get('Published'); ?> 
					<?php echo date(Config::get('general.date_format'), strtotime($a['pub_date'])); ?>
				</small>
			</p>

			<?php echo NiceString::makeNice($a['content'], 4, false, 200); ?>

			<p>
				<a href="<?php echo Router::urlFor('Article', $a); ?>">
					<?php echo Lang::get('Continue reading'); ?>
				</a>
			</p>
		</li>
	<?php } ?>
</ol>
