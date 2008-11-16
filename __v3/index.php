<?php
	# This is good for dev
	error_reporting(E_ALL);
	ini_set('display_errors', true);

	# The site(s) you wanna run
	define('SITE_HIERARCHY', 'aCMS aFramework');

	# Include the framework
	require_once 'aFramework/Bootstrap.php';
?>
