<ul>
	<?php foreach ($sites as $s) { ?>
		<li>
			<a href="<?php echo $s['url']; ?>" title="<?php echo Lang::get('Add to') . ' ' .  $s['title']; ?>">
				<img src="<?php echo Router::urlForFile('social-bookmark-icons/' . Router::urlize($s['title']) . '.gif', 'aFramework'); ?>" alt="<?php echo $s['title']; ?>" />
			</a>
		</li>
	<?php } ?>
</ul>