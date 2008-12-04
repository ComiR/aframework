<ul>
	<?php foreach($links as $l) { ?>
		<li>
			<a href="<?php echo $l['url']; ?>"><?php echo $l['title']; ?></a><br />
			<?php echo $l['description']; ?>
			<?php if(ADMIN) { ?><br /><a href="?blog_roll_delete=<?php echo $l['links_id']; ?>" title="Delete <?php echo $l['title']; ?>">Delete</a><?php } ?>
		</li>
	<?php } ?>
</ul>