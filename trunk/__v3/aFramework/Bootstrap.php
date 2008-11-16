<?php
	/**
	 * aFramework 3.0
	 *
	 * This file includes all necessary files and initiates the framework
	 **/
	require_once 'Core/Timer.php';
	Timer::start();

	define('AFRAMEWORK_VERSION',	'aFramework v3');

	# Start sessions
	session_start();

	# Include Functions and Config-class
	require_once 'Core/Config.php';
	require_once 'Core/Functions.php';

	# Directory paths
	define('DOCROOT',				realpath(dirname( __FILE__ ) .'/..') .'/');
	define('WEBROOT',				substr($_SERVER['SCRIPT_NAME'], 0, -9)); # minus "index.php"

	list($currentSite) = explode(' ', SITE_HIERARCHY);

	define('CURRENT_SITE',			$currentSite);
	define('CURRENT_SITE_DIR',		DOCROOT .CURRENT_SITE .'/');

	# Misc
	define('NAKED_DAY',				is_naked_day(9));
	define('XHR',					isset($_SERVER['HTTP_X_REQUESTED_WITH']));
	define('ADMIN_SESSION',			'admin');
	define('ADMIN',					isset($_COOKIE[ADMIN_SESSION]) or isset($_SESSION[ADMIN_SESSION]));
	define('DEBUG',					isset($_GET['debug']) and ADMIN);
	define('AUTO_HR',				false);
	define('USE_MOD_REWRITE',		false);

	# Include config-files
	$sites = array_reverse(explode(' ', SITE_HIERARCHY));

	foreach($sites as $site) {
		$path = DOCROOT .$site .'/Config.php';

		if(file_exists($path)) {
			require_once $path;
		}
	}

	# Connect to DB
	mysql_connect(Config::get('db.host'), Config::get('db.user'), Config::get('db.pass'));
	mysql_select_db(Config::get('db.name'));

	# Core classes
	require_once 'Core/AutoLoader.php';
	require_once 'Core/FourOFour.php';
	require_once 'Core/Router.php';
	require_once 'Core/StyleSwitcher.php';
	require_once 'Core/VisitorData.php';
	require_once 'Core/aFramework.php';

	# Register autoloader
	spl_autoload_register('AutoLoader::load');

	# The Router uses the current site's Routes.php-file to
	# set appropiate $_GET-variables (controller, url_str, etc)
	Router::run();

#	header('Content-type: text/plain');
#	var_dump(Router::getRoutes());
#	var_dump($_GET);
#	echo Router::urlFor($_GET['controller']) ."\n";
#	echo Router::urlFor('Article', array(
#		'url_str' => 'hej', 
#		'year' => '2008', 
#		'month' => '12'
#	)) ."\n";
#	echo Router::urlFor('Article', array(
#		'url_str' => 'hej', 
#		'year' => '2008', 
#		'month' => '12', 
#		'day' => '1', 
#		'daytona' => 'piss', 
#		'url' => 'something'
#	)) ."\n";
#	echo Router::urlForModule('Article') ."\n";
#	echo Router::urlForFile('/fonts/', 'aFramework') ."\n";
#	echo Router::urlForFile('/fonts/');
#	die;

	# The StyleSwitcher simply changes the value of
	# cookie.style upon user-request (either post.style or get.style)
	StyleSwitcher::run();

	# The VisitorData-class sets visitor-data to the visitor-data-cookie
	# upon user-request (either post.visitor_data or get.visitor_data)
	VisitorData::run();

	# aFramework either runs a single module or a collection of modules stored in a controller
	aFramework::run();
?>