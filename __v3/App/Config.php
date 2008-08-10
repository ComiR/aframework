<?php
	/**
	 * Site specific config
	 *
	 *
	 **/
	define('DB_USER',			'root');
	define('DB_PASS',			'root');
	define('DB_HOST',			'localhost');
	define('DB_TABLE_PREFIX',	'');

	define('ALLOW_STYLES',		true);
	define('DEFAULT_STYLE',		'default');

	define('SITE_AUTHOR',		'You');
	define('SITE_TITLE',		'Example Site');
	define('SITE_TAGLINE',		'This is just an aFramework example site');

	define('SITE_HIERARCHY',	CURRENT_SITE .' aFramework');
#	define('SITE_HIERARCHY',	CURRENT_SITE .' aBlog aForum aWebShop aFramework');
	define('FOUR_O_FOUR_CONTROLLER','FourOFour');

	define('GA_ID',				false); # Google analytics ID
?>