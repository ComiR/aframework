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
													'value'			=> ''
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
													'title'			=> 'Database table prefix', 
													'value'			=> ''
												));

	# aFramework
	Config::set('aframework',					array(
													'title'			=> 'General', 
													'description'	=> 'General settings used by various modules in aFramework.'
												));
	Config::set('aframework.allow_styles',		array(
													'title'			=> 'Allow user style switching (1/0)', 
													'value'			=> true
												));
	Config::set('aframework.default_style',		'default');
	Config::set('aframework.site_author',		array(
													'value'			=> 'Andreas Lagerkvist', 
													'default_value'	=> 'You'
												));
	Config::set('aframework.site_title',		array(
													'value'			=> 'aFramework', 
													'default_value'	=> 'My Awesome Site'
												));
	Config::set('aframework.site_tagline',		array(
													'value'			=> 'You shouldn\'t be running just aFramework', 
													'default_value'	=> 'My space on the web'
												));
	Config::set('aframework.contact_email',		'you@yourdomain.com');
	Config::set('aframework.ga_id',				array(
													'title'			=> 'Google analytics ID (if any)', 
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
