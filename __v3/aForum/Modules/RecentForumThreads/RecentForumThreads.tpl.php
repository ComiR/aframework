<ol>
	<?php foreach ($threads as $thread) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Thread', $thread); ?>">
					<?php echo $thread['title']; ?>
				</a>
					 by 
				<a href="<?php echo Router::urlFor('ForumAuthor', $thread['author']); ?>">
					<?php echo $thread['author']; ?>
				</a>
			</h3>

			<?php echo NiceString::makeNice($thread['content'], 4, false, 50); ?>
		</li>
	<?php } ?>
</ol>
