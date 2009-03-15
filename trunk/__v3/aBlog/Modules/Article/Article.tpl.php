<h2>
	<a href="<?php echo Router::urlFor('Article', $article); ?>">
		<?php echo htmlentities($article['title']); ?>
	</a>
</h2>

<p>
	<small>
		<?php echo Lang::get('published'); ?> 
		<?php echo date(Config::get('general.date_format'), strtotime($article['pub_date'])); ?>
	</small>
</p>

<?php echo NiceString::makeNice($article['content'], 3, $more_cut); ?>

<dl>
	<dt><?php echo Lang::get('tags'); ?></dt>
	<dd>
		<?php if ($article['tags']) { ?>
			<ul>
				<?php foreach ($article['tags'] as $t) { ?>
					<li>
						<a href="<?php echo Router::urlFor('ArticlesByTag', $t); ?>">
							<?php echo htmlentities($t['title']); ?>
						</a>
					</li>
				<?php } ?>
			</ul>
		<?php } else { ?>
			<?php echo Lang::get('no_tags'); ?>
		<?php } ?>
	</dd>
	<dt><?php echo Lang::get('comments'); ?></dt>
	<dd>
		<a href="<?php echo Router::urlFor('Article', $article); ?>#post-comment">
			<?php echo $article['num_comments'] ? $article['num_comments'] . ' ' . Lang::get('comments') : Lang::get('no_comments'); ?>
		</a>
	</dd>
</dl>