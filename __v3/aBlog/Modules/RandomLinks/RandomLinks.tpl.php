<ul>
	<?php foreach ($links as $l) { ?>
		<li>
			<a href="<?php echo htmlentities($l['url']); ?>">
				<?php echo htmlentities($l['title']); ?>
			</a><br />
			<?php echo htmlentities($l['description']); ?>
		</li>
	<?php } ?>
</ul>
