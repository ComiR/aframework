<ul>
	<?php foreach($nav_items as $i) { ?>
		<li><a href="<?php echo $i['url']; ?>"><?php echo $i['title']; ?></a></li>
	<?php } ?>
</ul>