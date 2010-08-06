<h2>Objekt</h2>

<ul>
	<?php foreach ($objects as $object) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Object', $object); ?>">
					<?php echo escHTML($object['address']); ?>, <?php echo escHTML($object['city']); ?>
				</a>
			</h3>

			<?php echo NiceString::makeNice($object['description'], 4, false, 150); ?>

			<p><a href="<?php echo Router::urlFor('Object', $object); ?>">Läs mer &raquo;</a></p>
		</li>
	<?php } ?>
</ul>