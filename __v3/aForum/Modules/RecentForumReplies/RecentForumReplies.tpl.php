<ol>
	<?php foreach ($replies as $reply) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Thread', $reply); ?>#thread-reply-<?php echo $reply['thread_replies_id']; ?>">
					<?php echo $reply['title']; ?>
				</a>
				 by 
				<a href="<?php echo Router::urlFor('ForumAuthor', $reply['author']); ?>">
					<?php echo $reply['author']; ?>
				</a>
			</h3>

			<?php echo NiceString::makeNice($reply['content'], 4, false, 50); ?>
		</li>
	<?php } ?>
</ol>
