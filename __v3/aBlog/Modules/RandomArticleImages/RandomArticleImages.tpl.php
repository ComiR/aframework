<ul>
	<?php foreach ($images as $image) { ?>
		<li>
			<a href="<?php echo $image['src']; ?>">
				<img src="<?php echo $image['src_thumb']; ?>" alt=""/>
			</a>
		</li>
	<?php } ?>
</ul>
