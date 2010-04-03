<ol>
	<?php foreach ($articles as $article) { ?>
		<li<?php if ($article['future']) { ?> class="future"<?php } ?>>
			<a href="<?php echo Router::urlFor('Article', $article); ?>">
				<?php echo escHTML($article['title']); ?>
			</a>
		</li>
	<?php } ?>
</ol>
