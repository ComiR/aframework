<ol<?php if ($start > 1) { ?> start="<?php echo $start; ?>"<?php } ?>>
	<?php foreach ($post_its as $post_it) { ?>
		<li>
			<?php echo $post_it['content']; ?>
		</li>
	<?php } ?>
</ol>
