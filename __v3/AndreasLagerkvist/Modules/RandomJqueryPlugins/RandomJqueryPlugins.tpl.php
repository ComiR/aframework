<ul>
	<?php foreach($plugins as $plugin) { ?>
		<li>
			<h3><a href="<?php echo $plugin['url']; ?>"><?php echo $plugin['title']; ?></a></h3>

			<?php echo $plugin['does']; ?>

			<p><a href="<?php echo $plugin['url']; ?>">Details</a></p>
		</li>
	<?php } ?>
</ul>