<ol<?php echo $start > 1 ? ' start="' . ($start) . '"' : '' ?>>
	<?php foreach ($results as $sr) { ?>
		<li>
			<h3>
				<a href="<?php echo $sr['url']; ?>">
					<?php echo $sr['title']; ?>
				</a>
			</h3>

			<p><?php echo $sr['content']; ?></p>

			<p>
				<a href="<?php echo $sr['url']; ?>">
					<?php echo Lang::get('read_more'); ?>
				</a>
			</p>
		</li>
	<?php } ?>
</ol>