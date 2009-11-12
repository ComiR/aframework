<ol>
	<?php foreach ($articles as $article) { ?>
		<li>
			<a href="<?php echo Router::urlFor('Article', $article); ?>">
				<?php echo htmlentities($article['title']); ?>
			</a>
		</li>
	<?php } ?>
</ol>
