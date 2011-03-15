<ol>
	<?php foreach ($threads as $thread) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Thread', $thread); ?>">
					<?php echo $thread['title']; ?>
				</a>
			</h3>
		</li>
	<?php } ?>
</ol>
