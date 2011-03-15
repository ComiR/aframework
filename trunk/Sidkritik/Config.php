<?php
	##################################################
	# Database
	# Database settings such as username and password.
	##################################################

	# Username
	Config::set('db.user', 'root');

	# Password
	Config::set('db.pass', 'root');

	# Host
	Config::set('db.host', 'localhost');

	# Database name
	Config::set('db.name', 'ante_sidkritik');

	# Database table prefix (if unsure leave empty)
	Config::set('db.table_prefix', '');

	##################################################
	# General
	# General settings used by various modules in aFramework.
	##################################################

	# Default style
	Config::set('general.default_style', 'sidkritik');

	# Site author
	Config::set('general.site_author', 'Andreas Lagerkvist');

	# Site title
	Config::set('general.site_title', 'Sidkritik.se');

	# Site tagline
	Config::set('general.site_tagline', 'Få konstruktiv kritik på din hemsida');

	# Contact email
	Config::set('general.contact_email', 'you@yourdomain.com');

	# Google analytics ID (if you use Google Analytics)
	Config::set('general.ga_id', false); # UA-1823084-11

	# Date format used throughout aFramework-sites
	Config::set('general.date_format', 'l jS F Y');

	##################################################
	# Language
	# If you intend to create a multi lingual site please specify which languages should be allowed, which should be default and which database tables should be translated
	##################################################

	# Comma separated list of allowed language codes
	Config::set('lang.allowed_langs', 'sv');

	# Preferred, default language
	Config::set('lang.default_lang', 'sv');

	# If your site is multilingual you can specify which DB tables should be language-specific
	Config::set('lang.translated_tables', '');

	##################################################
	# IE Support
	# Level of Internet Explorer Support for CSS and JS
	##################################################

	# Fallback style
	Config::set('ie_support.fallback_style', 'http://universal-ie6-css.googlecode.com/files/ie6.0.3.css');

	# CSS Support
	Config::set('ie_support.style_support', false);

	# JS Support
	Config::set('ie_support.script_support', false);

	##################################################
	# Administration
	# Logged in as admin you can customize the page you&apos;re at as well as administrate your site&apos;s content.
	##################################################

	# Username
	Config::set('admin.user', 'admin');

	# Password
	Config::set('admin.pass', '1234');

	##################################################
	# SU Admin
	##################################################

	# Username
	Config::set('su.user', 'su');

	# Password
	Config::set('su.pass', '4321');

	##################################################
	# Navigation Items
	# Which navigation items should aFramework add?
	##################################################

	# Home
	Config::set('navigation.home', true);

	# Styles
	Config::set('navigation.styles', false);

	##################################################
	# aDynAdmin
	# Settings for aFramework&apos;s dynamic admin; aDynAdmin
	##################################################

	# Num items per page
	Config::set('adynadmin.num_items_per_page', '10');
?>
