<?php
	Config::set('db.user',						'root');
	Config::set('db.pass',						'root');
	Config::set('db.host',						'localhost');
	Config::set('db.name',						'ole2');
	Config::set('db.translated_tables',			'articles,pages,tags,article_tags,comments');

	Config::set('general.allowed_langs',		'en,sv,fo');
	Config::set('general.default_lang',			'en');

	Config::set('general.default_style',		'open-ole');

	Config::set('general.site_author',			'Our Life as Elderly');
	Config::set('general.site_title',			'Our Life as Elderly');
	Config::set('general.site_tagline',			'Elderly care when the older to be decides');

	Config::set('general.contact_email',		'info@ourfuture.eu');
	Config::set('general.date_format',			'l jS \of F Y');
	Config::set('general.ga_id',				false);

	Config::set('general.ie_script_support',	false);
	Config::set('general.ie_style_support',		6);

	Config::set('admin.user',					'admin');
	Config::set('admin.pass',					'1234');

	Config::set('navigation.home',				true);
	Config::set('navigation.styles',			false);
	Config::set('navigation.archives',			false);
?>
