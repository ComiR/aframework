<?php
	/**
	 * aFramework - PHP Web Development Framework
	 *
	 * This is the entry-point for aFramework. You may wanna edit
	 * the default SITE_HIERARCHY definition if you intend to
	 * work on your own projects (~line >35).
	 *
	 * Copyright: 2006-2009 Andreas Lagerkvist (andreaslagerkvist.com)
	 * License: http://creativecommons.org/licenses/by/3.0/
	 **/
	# Start the timer
	require_once 'aFramework/Core/Timer.php';
	Timer::start();

	# UTF-8 FTW
	header('Content-Type: text/html; charset=utf-8');
#	setlocale(LC_ALL, 'en_GB.UTF8');

	# While deving
	error_reporting(0);
	ini_set('display_errors', false);

	# Determine which site(s) to run
	# Add your own domains and site hierarchies here
	switch ($_SERVER['HTTP_HOST']) {
		case 'andreaslagerkvist.com' : 
			define('SITE_HIERARCHY', 'AndreasLagerkvist aBlog aCMS aDynAdmin aFramework');
			break;
		case 'agnesekman.com' : 
			define('SITE_HIERARCHY', 'AgnesEkman aBlog aCMS aDynAdmin aFramework');
			break;
		case 'ourfuture.eu' : 
			define('SITE_HIERARCHY', 'OurFutureEU aBlog aCMS aDynAdmin aFramework');
			break;
		case 'a-framework.org' : 
			define('SITE_HIERARCHY', 'aFrameworkCom aCMS aDynAdmin aFramework');
			break;
		default : 
			define('SITE_HIERARCHY', 'aTestSite aBlog aCMS aDynAdmin aFramework');
			break;
	}

	# Core classes/files
	require_once 'aFramework/Core/aFramework.php';
	require_once 'aFramework/Core/AutoLoader.php';
	require_once 'aFramework/Core/Config.php';
	require_once 'aFramework/Core/DB.php';
	require_once 'aFramework/Core/FourOFour.php';
	require_once 'aFramework/Core/Functions.php';
	require_once 'aFramework/Core/Lang.php';
	require_once 'aFramework/Core/LangSwitcher.php';
	require_once 'aFramework/Core/Router.php';
	require_once 'aFramework/Core/VisitorData.php';

	# Start sessions
	session_start();

	# Directory paths
	define('DOCROOT',			realpath(dirname( __FILE__ )) . '/');
	define('WEBROOT',			substr($_SERVER['SCRIPT_NAME'], 0, -9)); # minus "index.php"

	list($currentSite)			= explode(' ', SITE_HIERARCHY);

	define('CURRENT_SITE',		$currentSite);
	define('CURRENT_SITE_DIR',	DOCROOT . CURRENT_SITE . '/');

	# Misc
	define('NAKED_DAY',			is_naked_day(9));
	define('XHR',				isset($_SERVER['HTTP_X_REQUESTED_WITH']));
	define('ADMIN_SESSION',		'admin');
	define('ADMIN',				isset($_COOKIE[ADMIN_SESSION]) or isset($_SESSION[ADMIN_SESSION]));
	define('CONTROLLER_ADMIN',	ADMIN and (isset($_SESSION['controller_admin']) or isset($_GET['controller_admin'])) and !isset($_GET['no_controller_admin']));
	define('AUTO_HR',			false);
	define('USE_MOD_REWRITE',	true);

	# Register autoloader
	spl_autoload_register('AutoLoader::load');

	# Include config-files (include top prio site's config last (to override others))
	$sites = array_reverse(explode(' ', SITE_HIERARCHY));

	foreach ($sites as $site) {
		$path = DOCROOT . $site . '/Config.php';

		if (file_exists($path)) {
			include $path;
		}
	}

	# Special case to allow empty allowed_langs...
	$allowedLangs = Config::get('lang.allowed_langs');

	if (empty($allowedLangs)) {
		Config::set('lang.allowed_langs', Config::get('lang.default_lang'));
	}

	# Set correct lang based on URI (/ => default, /sv/ => swedish, /fo/ => faroese etc..)
	# Needs to run _after_ config so it knows which langs are allowed/default etc...
	LangSwitcher::run();

	# Connect to DB (username etc set in config for each site)
	DB::connect();

	# Set Router-params based on the requested URI - but remove lang-prefix before (/sv/ for example)
	$requestedURI = isset($_SERVER['PATH_INFO']) ? str_replace('/' . CURRENT_LANG . '/', '/', $_SERVER['PATH_INFO']) : '/';	

	Router::run($requestedURI);

	# Store and retrieve visitor-data (name, email etc (for forms with "remember me"))
	# Needs to run on every load, even single-module ajax-requests (so can not be an autorun-module)
	VisitorData::run();

	# Now run the requested controller (Router.params.controller.) or module (_GET.module)
	aFramework::run();
?>
