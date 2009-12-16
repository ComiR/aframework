<ul>
	<?php foreach ($links as $l) { ?>
		<li>
			<a href="<?php echo escHTML($l['url']); ?>">
				<?php echo escHTML($l['title']); ?>
			</a><br />
			<?php echo escHTML($l['description']); ?>
		</li>
	<?php } ?>
</ul>
