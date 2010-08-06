<h2><?php echo escHTML($office['title']); ?></h2>

<?php echo NiceString::makeNice($office['description'], 3, false, 150); ?>

<dl>
	<dt>Adress:</dt>
	<dd><?php echo escHTML($office['address']);?></dd>
	<dd><?php echo escHTML($office['postal_code']) . ' ' . escHTML($office['city']); ?></dd>

	<dt>Hemsida:</dt>
	<dd><a href="<?php echo $office['website']; ?>"><?php echo $office['website']; ?></a></dd>

	<dt>E-post:</dt>
	<dd><a href="mail-to:<?php echo $office['email']; ?>"><?php echo $office['email']; ?></a></dd>

	<dt>Telefon:</dt>
	<dd><?php echo $office['phone']; ?></dd>

	<?php if (!empty($office['fax'])) { ?>
		<dt>Fax:</dt>
		<dd><?php echo $office['fax']; ?></dd>
	<?php } ?>
</dl>
