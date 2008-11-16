<ul>
	<?php foreach($links as $l) { ?>
		<li><a href="<?php echo $l['url']; ?>"><?php echo $l['title']; ?></a><br /><?php echo $l['description']; ?></li>
	<?php } ?>
</ul>