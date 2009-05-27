<ul>
	<?php foreach ($plugins as $plugin) { ?>
		<li>
			<h3>
				<a href="<?php echo $plugin['url']; ?>">
					<?php echo $plugin['title']; ?>
				</a>
			</h3>

			<?php echo $plugin['does_short']; ?>

			<p>
				<a href="<?php echo $plugin['url']; ?>">
					<?php echo Lang::get('Details'); ?>
				</a>
			</p>
		</li>
	<?php } ?>
</ul>