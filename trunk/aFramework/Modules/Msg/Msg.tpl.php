<?php if ($title) { ?>
	<h2><?php echo escHTML($title); ?></h2>
<?php } ?>

<?php echo NiceString::makeNice($msg, 3, false, false, true); ?>
