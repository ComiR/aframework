<?php
	/**
	 * aFramework 3.0
	 *
	 * This file includes all necessary files and initiates the framework
	 **/
	# Include Config-files
	require_once dirname(__FILE__) .'/Core/Config.php';
	require_once CURRENT_SITE_DIR .'/Config.php';

	# Connect to DB
	mysql_connect(DB_HOST, DB_USER, DB_PASS);
	mysql_select_db(DB_NAME);

	# Start sessions
	session_start();

	# Include Core-files
	require_once 'Core/Functions.php';
	require_once 'Core/AutoLoader.php';
	require_once 'Core/Router.php';
	require_once 'Core/StyleSwitcher.php';
	require_once 'Core/VisitorData.php';
	require_once 'Core/aFramework.php';
	require_once 'Core/Module.php';

	spl_autoload_register('AutoLoader::load');

	# The Router uses the current site's Routes.php-file to
	# set appropiate $_GET-variables (controller, url_str, etc)
	Router::run();

	# The StyleSwitcher simply changes the value of
	# cookie.style upon user-request (either post.style or get.style)
	StyleSwitcher::run();

	# The VisitorData-class sets visitor-data to the visitor-data-cookie
	# upon user-request (either post.visitor_data or get.visitor_data)
	VisitorData::run();

	# aFramework either runs a single module or a collection of modules stored in a controller
	aFramework::run();
?>