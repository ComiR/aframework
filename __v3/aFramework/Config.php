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
?>