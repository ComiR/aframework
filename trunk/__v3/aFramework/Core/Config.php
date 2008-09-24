<?php
	/**
	 * Config
	 *
	 * Some configuration-constants
	 **/
	define('AFRAMEWORK_VERSION',	'aFramework v3');
	define('USE_MOD_REWRITE',		true);

	# Directory paths
	define('DOCROOT',				realpath(dirname( __FILE__ ) .'/../..') .'/');
	define('WEBROOT',				substr($_SERVER['SCRIPT_NAME'], 0, -9)); # minus "index.php"
	define('WEBROOT_INDEX',			USE_MOD_REWRITE ? WEBROOT : $_SERVER['SCRIPT_NAME'] .'/'); # wiv index.php if no mod_rew
	define('CURRENT_SITE_DIR',		DOCROOT .CURRENT_SITE .'/');

	# Misc
	define('NAKED_DAY',				is_naked_day(9));
	define('XHR',					isset($_SERVER['HTTP_X_REQUESTED_WITH']));
	define('ADMIN_SESSION',			'admin');
	define('ADMIN',					isset($_COOKIE[ADMIN_SESSION]) or isset($_SESSION[ADMIN_SESSION]));
	define('DEBUG',					isset($_GET['debug']) and ADMIN);
	define('AUTO_HR',				false);
?>