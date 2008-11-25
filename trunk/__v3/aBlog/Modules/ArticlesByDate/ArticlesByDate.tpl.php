<h2>Articles by Date</h2>

<ul>
	<?php for($i = 0; $i < 6; $i++) { ?>
		<li>
			<h3><a href="{$dl_date.url}" title="View all articles from {$dl_date.my}">{$dl_date.my}</a></h3>

			<ul>
				<?php for($j = 0; $j < 6; $j++) { ?>
					<li>
						<h4><a href="{$dl_date_article.url}" title="Permanent link to ''{$dl_date_article.title}''">{$dl_date_article.title}</a></h4>

						{$dl_date_article.excerpt}

						<p><a href="<?php echo Router::urlFor('Article', $article); ?>">Continue reading</a></p>
					</li>
				<?php } ?>
			</ul>
		</li>
	<?php } ?>
</ul>