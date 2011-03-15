<?php
	require_once '../Lib/NiceString.php';

	$data	= isset($_POST['data']) ? stripslashes($_POST['data']) : '';
	$mhl	= isset($_POST['mhl']) ? $_POST['mhl'] : false;
	$html	= isset($_POST['html']) and $_POST['html'] ? true : false;

	echo NiceString::makeNice($data, $mhl, false, false, $html);
?>
