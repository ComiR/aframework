<ul>
	<?php foreach($links as $l) { ?>
		<li>
			<a href="<?php echo $l['url']; ?>">
				<?php echo Lang::get('skip_to'); ?> 
				<?php echo $l['title']; ?>
			</a>
		</li>
	<?php } ?>
</ul>