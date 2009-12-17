<h2>Posted Pictures</h2>

<ol>
	<?php foreach ($images as $image) { ?>
		<li>
			<h3><?php echo escHTML($image['title']); ?></h3>

			<a href="<?php echo $image['src']; ?>">
				<img src="<?php echo $image['src']; ?>" alt=""/>
			</a>

			<p>
				Posted <?php echo date('j F', strtotime($image['article']['pub_date'])); ?> in:<br/>
				<a href="<?php echo Router::urlFor('Article', $image['article']); ?>">
					<?php echo escHTML(substr($image['article']['title'], 0, 10)); ?>...
				</a>
			</p>
		</li>
	<?php } ?>	
</ol>