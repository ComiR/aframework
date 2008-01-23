<?php
	require_once 'FormValidator.php';
	$fv = new FormValidator();
	echo ($fv->validate($_REQUEST)) ? 1 : 0;
?>