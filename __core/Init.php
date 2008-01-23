<?php
	/**
	 * This file contains configuration constants
	 * and also takes care of initialising the framework
	 */

	# Directory paths
	define('AUTO_DIV',			true);

	define('ROOT_DIR',			str_replace('//', '/', $_SERVER['DOCUMENT_ROOT'] .'/'));	# Document Root

	define('HTML_STYLES_DIR',	'/__styles/');												# "HTML" Styles Dir
	define('HTML_FILES_DIR',	'/__files/');												# "HTML" Files Dir

	define('CORE_DIR',			ROOT_DIR .'__core/');										# Core Dir
	define('STYLES_DIR',		ROOT_DIR .'__styles/');										# Styles Dir
	define('FILES_DIR',			ROOT_DIR .'__files/');										# User Files Dir

	define('MODULES_DIR',		CORE_DIR .'Modules/');										# Modules Dir / Templates Dir
	define('LIB_DIR',			CORE_DIR .'Lib/');											# Lib Dir
	define('PAGE_TYPES_DIR',	CORE_DIR .'PageTypes/');									# Page Types Dir

	define('AFRAMEWORK_VERSION',	'aFramework v3');

	define('AJAX_CALL',			(isset($_SERVER['HTTP_X_REQUESTED_WITH']) and $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'));

	# Include some stuff
	require_once CORE_DIR .'Config.php';
	require_once LIB_DIR .'MicroAskimet.php';
	require_once LIB_DIR .'MicroAskimet.php';
	require_once LIB_DIR .'MarkDown.php';
	require_once LIB_DIR .'Functions.php';
	require_once LIB_DIR .'NiceString.php';

	# Connect to DB
	mysql_connect(DB_HOST, DB_USER, DB_PASS);
	mysql_select_db(DB_NAME);

	# Start sessions
	session_start();

	# This is a global tpl-var-array, each module needs to set its
	# tpl-vars in here with global $_TPLVARS['module_name']['var_name'] = 'value';
	$_TPLVARS = array();

	# This is a global params-array constructed from the URI by the routing-functions
	$_PARAMS = array();
?>