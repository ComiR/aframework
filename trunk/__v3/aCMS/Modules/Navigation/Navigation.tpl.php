<ul>
	<?php foreach($nav_items as $i) { ?>
		<li>
			<?php if($i['selected']) { ?><strong><?php } ?>
			<a href="<?php echo $i['url']; ?>"><?php echo $i['title']; ?></a>
			<?php if($i['selected']) { ?></strong><?php } ?>
		</li>
	<?php } ?>
</ul>