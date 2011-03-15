<h2><?php echo escHTML($object['address']); ?>, <?php echo escHTML($object['city']); ?></h2>

<?php echo NiceString::makeNice($object['description'], 3, false, 150); ?>

<dl>
	<dt>Adress</dt>
	<dd><?php echo Object::address($object); ?></dd>

	<dt>Utgångspris</dt>
	<dd><?php echo escHTML($object['starting_price']); ?> kr</dd>

	<dt>Budgivningsstart</dt>
	<dd><?php echo $object['start_date']; ?></dd>

	<?php if ($object['sold']) {?>
		<dt>Budgivning avslutad</dt>
		<dd><?php echo $object['end_date']; ?></dd>
	<?php } ?>
</dl>