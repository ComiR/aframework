<ul>
	<?php foreach ($nav_items as $item) { ?>
		<li>
			<?php if ($item['selected']) { ?>
				<strong>
					<?php echo escHTML($item['title']); ?>
				</strong>
			<?php } else { ?>
				<a href="<?php echo $item['url']; ?>">
					<?php echo escHTML($item['title']); ?>
				</a>
			<?php } ?>
		</li>
	<?php } ?>
</ul>
