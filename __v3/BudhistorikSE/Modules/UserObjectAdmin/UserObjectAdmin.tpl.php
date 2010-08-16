<?php if (isset(Router::$params['objects_id'])) { ?>
	<h2>Redigera objekt</h2>
<?php } else { ?>
	<h2>Lägg till objekt</h2>
<?php } ?>

<?php echo $form_html; ?>