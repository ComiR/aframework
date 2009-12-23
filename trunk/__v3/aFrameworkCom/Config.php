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
	Config::set('db.name', 'ante_aframework_com');

	# Database table prefix (if unsure leave empty)
	Config::set('db.table_prefix', '');

	##################################################
	# General
	# General settings used by various modules in aFramework.
	##################################################

	# Default style
	Config::set('general.default_style', 'aframework-com');

	# Site author
	Config::set('general.site_author', 'Andreas Lagerkvist');

	# Site title
	Config::set('general.site_title', 'aFramework');

	# Site tagline
	Config::set('general.site_tagline', 'a Lightweight and Modular Open Source PHP Web Development Framework');

	# Contact email
	Config::set('general.contact_email', 'you@yourdomain.com');

	# Google analytics ID (if you use Google Analytics)
	Config::set('general.ga_id', '');

	# Date format used throughout aFramework-sites
	Config::set('general.date_format', 'Y-m-d H:i:s');

	##################################################
	# Language Settings
	# If you intend to create a multi lingual site please specify which languages should be allowed, which should be default and which database tables should be translated
	##################################################

	# Comma separated list of allowed language codes
	Config::set('lang.allowed_langs', 'en');

	# Preferred, default language
	Config::set('lang.default_lang', 'en');

	# If your site is multilingual you can specify which DB tables should be language-specific
	Config::set('lang.translated_tables', '');

	##################################################
	# IE Support
	# Level of Internet Explorer Support for CSS and JS
	##################################################

	# CSS Support
	Config::set('ie_support.style_support', '6');

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
	# Navigation Items
	# Which navigation items should aFramework add?
	##################################################

	# Home
	Config::set('navigation.home', '1');

	# Styles
	Config::set('navigation.styles', '1');

	# Archives
	Config::set('navigation.archives', '1');

	##################################################
	# aDynAdmin
	# Settings for aFramework&apos;s dynamic admin; aDynAdmin
	##################################################

	# Num items per page
	Config::set('adynadmin.num_items_per_page', '10');

	##################################################
	# aBlog
	# General settings for aBlog, used by different aBlog-modules.
	##################################################

	# Number of recent stuff (eg comments)
	Config::set('ablog.num_recent_stuff', '3');

	# Number of recent articles on first page
	Config::set('ablog.num_recent_articles', '8');

	# Number of older articles below latest article
	Config::set('ablog.num_older_articles', '3');

	# Minutes users need to wait between comments
	Config::set('ablog.comment_spam_time', '5');
?>
