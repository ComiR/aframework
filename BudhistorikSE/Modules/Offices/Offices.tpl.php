<h2>Mäklarkontor</h2>

<ul>
	<?php foreach ($offices as $office) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('Office', $office); ?>">
					<?php echo escHTML($office['title']); ?>
				</a>
			</h3>

			<?php echo NiceString::makeNice($office['description'], 4, false, 150); ?>

			<p><a href="<?php echo Router::urlFor('Office', $office); ?>">Läs mer &raquo;</a></p>
		</li>
	<?php } ?>
</ul>