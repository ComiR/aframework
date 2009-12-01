<?php
	# While deving
	error_reporting(0);
	ini_set('display_errors', false);

	# Start the timer
	require_once 'aFramework/Core/Timer.php';
	Timer::start();

	# The site(s) you wanna run
/*	switch ($_SERVER['SERVER_NAME']) {
		case 'andreaslagerkvist.com' : 
			define('SITE_HIERARCHY', 'AndreasLagerkvist aBlog aCMS aDynAdmin aFramework');
			break;
		case 'agnesekman.com' : 
			define('SITE_HIERARCHY', 'AgnesEkman aBlog aCMS aDynAdmin aFramework');
			break;
		case 'ourfuture.eu' : 
			define('SITE_HIERARCHY', 'OurFutureEU aBlog aCMS aDynAdmin aFramework');
			break;
		case 'localhost' : 
			define('SITE_HIERARCHY', 'aTestSite aBlog aForum aCMS aDynAdmin aModPack aFramework');
			break;
	} */
#	define('SITE_HIERARCHY', 'aTestSite aBlog aForum aCMS aDynAdmin aModPack aFramework');
	define('SITE_HIERARCHY', 'AndreasLagerkvist aBlog aCMS aDynAdmin aFramework');
#	define('SITE_HIERARCHY', 'OurFutureEU aBlog aCMS aDynAdmin aFramework');

	# Core classes/files
	require_once 'aFramework/Core/Config.php';
	require_once 'aFramework/Core/DB.php';
	require_once 'aFramework/Core/LangSwitcher.php';
	require_once 'aFramework/Core/Functions.php';
	require_once 'aFramework/Core/Lang.php';
	require_once 'aFramework/Core/AutoLoader.php';
	require_once 'aFramework/Core/FourOFour.php';
	require_once 'aFramework/Core/Router.php';
	require_once 'aFramework/Core/VisitorData.php';
	require_once 'aFramework/Core/aFramework.php';

	# Start sessions
	session_start();

	# Directory paths
	define('DOCROOT',				realpath(dirname( __FILE__ )) . '/');
	define('WEBROOT',				substr($_SERVER['SCRIPT_NAME'], 0, -9)); # minus "index.php"

	list($currentSite)				= explode(' ', SITE_HIERARCHY);

	define('CURRENT_SITE',			$currentSite);
	define('CURRENT_SITE_DIR',		DOCROOT . CURRENT_SITE . '/');

	# Misc
	define('NAKED_DAY',				is_naked_day(9));
	define('XHR',					isset($_SERVER['HTTP_X_REQUESTED_WITH']));
	define('ADMIN_SESSION',			'admin');
	define('ADMIN',					isset($_COOKIE[ADMIN_SESSION]) or isset($_SESSION[ADMIN_SESSION]));
	define('CONTROLLER_ADMIN',		ADMIN and (isset($_SESSION['controller_admin']) or isset($_GET['controller_admin'])) and !isset($_GET['no_controller_admin']));
	define('AUTO_HR',				false);
	define('USE_MOD_REWRITE',		true);

	# Include config-files
	$sites = array_reverse(explode(' ', SITE_HIERARCHY));

	foreach ($sites as $site) {
		$path = DOCROOT . $site . '/Config.php';

		if (file_exists($path)) {
			require_once $path;
		}
	}

	# Set correct lang based on URI
	LangSwitcher::run();

	# Connect to DB
	DB::connect();

	# Register autoloader
	spl_autoload_register('AutoLoader::load');

	# The Router uses the current site's Routes.php-file to
	# set appropiate $_GET-variables (controller, url_str, etc)
	$requestedURI = isset($_SERVER['PATH_INFO']) ? str_replace('/' . CURRENT_LANG . '/', '/', $_SERVER['PATH_INFO']) : '/';	

	Router::run($requestedURI);

	# The VisitorData-class sets visitor-data to the visitor-data-cookie
	# upon user-request (either post.visitor_data or get.visitor_data)
	VisitorData::run();

	# aFramework either runs a single module or a collection of modules stored in a controller
	aFramework::run();
?>
