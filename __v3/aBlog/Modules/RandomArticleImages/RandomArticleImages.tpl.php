<h2>Random Images</h2>

<ul>
	<?php foreach ($images as $image) { ?>
		<li>
			<a href="<?php echo $image['src']; ?>">
				<img src="<?php echo $image['src']; ?>" alt=""/>
			</a>
		</li>
	<?php } ?>
</ul>
