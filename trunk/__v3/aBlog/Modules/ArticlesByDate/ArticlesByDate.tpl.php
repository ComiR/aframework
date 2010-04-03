<ul>
	<?php foreach ($dates as $d) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('ArticlesByMonth', $d); ?>">
					<?php echo $d['month_year']; ?>
				</a>
			</h3>

			<ul>
				<?php foreach ($d['articles'] as $a) { ?>
					<li<?php if ($a['future']) { ?> class="future"<?php } ?>>
						<h4>
							<a href="<?php echo Router::urlFor('Article', $a); ?>">
								<?php echo escHTML($a['title']); ?>
							</a>
						</h4>

						<?php echo NiceString::makeNice($a['content'], 5, false, 150); ?>

						<p>
							<a href="<?php echo Router::urlFor('Article', $a); ?>">
								<?php echo Lang::get('Continue reading'); ?>
							</a>
						</p>
					</li>
				<?php } ?>
			</ul>
		</li>
	<?php } ?>
</ul>
