<h2>Objekt</h2>

<ul>
	<li>
		<h3>
			<a href="<?php echo Router::urlFor('Object', $object); ?>">
				<?php echo escHTML($object['address']); ?>, <?php echo escHTML($object['city']); ?>
			</a>
		</h3>

		<?php echo NiceString::makeNice($object['description'], 4, false, 150); ?>

		<dl>
			<dt>Adress:</dt>
			<dd><?php echo Object::address($object); ?></dd>

			<dt>Utgångspris:</dt>
			<dd><?php echo escHTML($object['starting_price']); ?> kr</dd>

			<dt>Budgivningsstart:</dt>
			<dd><?php echo $object['start_date']; ?></dd>

			<?php if ($object['sold']) {?>
				<dt>Budgivning avslutad:</dt>
				<dd><?php echo $object['end_date']; ?></dd>
			<?php } ?>
		</dl>
	</li>
</ul>
