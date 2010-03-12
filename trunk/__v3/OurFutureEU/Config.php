<?php
	Config::set('db.user',						'root');
	Config::set('db.pass',						'root');
	Config::set('db.host',						'localhost');
	Config::set('db.name',						'ante_ole');

	Config::set('lang.allowed_langs',			'en,sv,fo');
	Config::set('lang.default_lang',			'en');
	Config::set('lang.translated_tables',		'articles,pages,tags,article_tags,comments,activities,revisions');

	Config::set('general.default_style',		'boxy-ole');

	Config::set('general.site_author',			'Our Life as Elderly');
	Config::set('general.site_title',			'Our Life as Elderly');
	Config::set('general.site_tagline',			'Elderly care when the older to be decides');

	Config::set('general.contact_email',		'info@ourfuture.eu');
	Config::set('general.date_format',			'l jS \of F Y');
	Config::set('general.ga_id',				false); # UA-1823084-8

	Config::set('ie_support.script_support',	7);
	Config::set('ie_support.style_support',		7);
	Config::set('ie_support.fallback_style',	Router::urlForStyle('ie-ole'));

	Config::set('admin.user',					'admin');
	Config::set('admin.pass',					'1234');
	Config::set('su.user',						'su');
	Config::set('su.pass',						'4321');

	Config::set('navigation.home',				true);
	Config::set('navigation.styles',			false);
	Config::set('navigation.archives',			false);

	Config::set('ablog.num_recent_comments',	3);
?>
