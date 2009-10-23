<ol>
	<?php foreach ($replies as $reply) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Thread', $reply); ?>#thread-reply-<?php echo $reply['thread_replies_id']; ?>">
					<?php echo $reply['title']; ?>
				</a>
			</h3>
		</li>
	<?php } ?>
</ol>
