<?php
	# Database
	Config::set('db',							array(
													'title'			=> 'Database', 
													'description'	=> 'Database settings such as username and password.'
												));
	Config::set('db.user',						array(
													'title'			=> 'Username', 
													'value'			=> 'root'
												));
	Config::set('db.pass',						array(
													'title'			=> 'Password', 
													'value'			=> 'root'
												));
	Config::set('db.host',						array(
													'title'			=> 'Host', 
													'value'			=> 'localhost'
												));
	Config::set('db.name',						array(
													'title'			=> 'Database name', 
													'value'			=> 'afv3'
												));
	Config::set('db.table_prefix',				array(
													'title'			=> 'Database table prefix (if unsure leave empty)', 
													'value'			=> ''
												));

	# aFramework
	Config::set('general',						array(
													'title'			=> 'General', 
													'description'	=> 'General settings used by various modules in aFramework.'
												));
	Config::set('general.default_style',		'aframework');
	Config::set('general.site_author',			array(
													'value'			=> 'Andreas Lagerkvist', 
													'description'	=> 'You'
												));
	Config::set('general.site_title',			array(
													'value'			=> 'aFramework', 
													'description'	=> 'My Awesome Site'
												));
	Config::set('general.site_tagline',			array(
													'value'			=> 'You shouldn\'t be running just aFramework', 
													'description'	=> 'My space on the web'
												));
	Config::set('general.contact_email',		'you@yourdomain.com');
	Config::set('general.ga_id',				array(
													'title'			=> 'Google analytics ID (if you use Google Analytics)', 
													'value'			=> false
												));
	Config::set('general.date_format',			array(
													'title'			=> 'Date format used throughout aFramework-sites', 
													'value'			=> 'Y-m-d H:i:s'
												));

	# Language
	Config::set('lang',							array(
													'title'			=> 'Language', 
													'description'	=> 'If you intend to create a multi lingual site please specify which languages should be allowed, which should be default and which database tables should be translated'
												));
	Config::set('lang.allowed_langs',			array(
													'title'			=> 'Comma separated list of allowed language codes', 
													'value'			=> 'en'
												));
	Config::set('lang.default_lang',			array(
													'title'			=> 'Preferred, default language', 
													'value'			=> 'en'
												));
	Config::set('lang.translated_tables',		array(
													'title'			=> 'If your site is multilingual you can specify which DB tables should be language-specific', 
													'value'			=> ''
												));

	# IE Support
	Config::set('ie_support',					array(
													'title'			=> 'IE Support', 
													'description'	=> 'Level of Internet Explorer Support for CSS and JS'
												));
	Config::set('ie_support.style_support',		array(
													'title'			=> 'CSS Support', 
													'value'			=> false, 
													'description'	=> 'false, true or a version-number (6 means CSS support for IE6 and up)'
												));
	Config::set('ie_support.script_support',	array(
													'title'			=> 'JS Support', 
													'value'			=> false, 
													'description'	=> 'false, true or a version-number (6 means JS support for IE6 and up)'
												));

	# Admin
	Config::set('admin',						array(
													'title'			=> 'Administration', 
													'description'	=> 'Logged in as admin you can customize the page you\'re at as well as administrate your site\'s content.'
												));
	Config::set('admin.user',					array(
													'title'			=> 'Username', 
													'value'			=> 'admin'
												));
	Config::set('admin.pass',					array(
													'title'			=> 'Password', 
													'value'			=> '1234'
												));

	# Navigation
	Config::set('navigation',				array(
													'title'			=> 'Navigation Items', 
													'description'	=> 'Which navigation items should aFramework add?'
												));
	Config::set('navigation.home',				array(
													'value'			=> true, 
													'description'	=> 'true/false', 
												));
	Config::set('navigation.styles',			array(
													'value'			=> true, 
													'description'	=> 'true/false', 
												));
?>
