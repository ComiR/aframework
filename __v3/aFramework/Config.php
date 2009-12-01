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
	Config::set('db.translated_tables',			array(
													'title'			=> 'If your site is multilingual you can specify which DB tables should be language-specific', 
													'value'			=> ''
												));

	# aFramework
	Config::set('general',						array(
													'title'			=> 'General', 
													'description'	=> 'General settings used by various modules in aFramework.'
												));
	Config::set('general.allow_styles',			true);
	Config::set('general.default_style',		'default');
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
	Config::set('general.allowed_langs',		array(
													'title'			=> 'Comma separated list of allowed language codes', 
													'value'			=> 'en'
												));
	Config::set('general.default_lang',			array(
													'title'			=> 'Preferred, default language', 
													'value'			=> 'en'
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
	Config::set('navigation.home',				true);
	Config::set('navigation.styles',			true);
?>
