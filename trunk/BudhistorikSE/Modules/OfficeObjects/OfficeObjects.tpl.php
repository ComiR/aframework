<h3>Kontorets senaste objekt</h3>

<ul>
	<?php foreach ($objects as $object) { ?>
		<li>
			<h4>
				<a href="<?php echo Router::urlFor('Object', $object); ?>">
					<?php echo escHTML($object['address']); ?>, <?php echo escHTML($object['city']); ?>
				</a>
			</h4>

			<?php echo NiceString::makeNice($object['description'], 5, false, 150); ?>

			<p><a href="<?php echo Router::urlFor('Object', $object); ?>">Läs mer &raquo;</a></p>
		</li>
	<?php } ?>
</ul>