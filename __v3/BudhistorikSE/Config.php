<?php
	Config::set('db.user',						'root');
	Config::set('db.pass',						'root');
	Config::set('db.host',						'localhost');
	Config::set('db.name',						'ante_budhistorik');

	Config::set('lang.allowed_langs',			'sv');
	Config::set('lang.default_lang',			'sv');

	Config::set('general.default_style',		'default');

	Config::set('general.site_author',			'Erik Byström');
	Config::set('general.site_title',			'Budhistorik.se');
	Config::set('general.site_tagline',			'Här blir det någon form av tagline');

	Config::set('general.contact_email',		'info@budhistorik.se');
	Config::set('general.date_format',			'l jS \of F Y');
	Config::set('general.ga_id',				false);

	Config::set('ie_support.script_support',	false);
	Config::set('ie_support.style_support',		true);

	Config::set('admin.user',					'admin');
	Config::set('admin.pass',					'1234');
	Config::set('su.user',						'su');
	Config::set('su.pass',						'4321');

	Config::set('navigation.home',				true);
	Config::set('navigation.styles',			false);
	Config::set('navigation.archives',			false);

	Config::set('ablog.num_recent_comments',	3);
?>
