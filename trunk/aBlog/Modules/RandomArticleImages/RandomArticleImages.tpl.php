<ul>
	<?php foreach ($images as $image) { ?>
		<li<?php if ($image['article']['future']) { ?> class="future"<?php } ?>>
			<a href="<?php echo $image['src']; ?>">
				<img src="<?php echo $image['src_thumb']; ?>" alt=""/>
			</a>
		</li>
	<?php } ?>
</ul>
