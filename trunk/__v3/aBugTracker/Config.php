<?php
	Config::set('db.user',						'root');
	Config::set('db.pass',						'root');
	Config::set('db.host',						'localhost');
	Config::set('db.name',						'ante_bugtracker');

	Config::set('general.default_style',		'bugtracker');
	Config::set('general.site_author',			'Andreas Lagerkvist');
	Config::set('general.site_title',			'aBugTracker');
	Config::set('general.site_tagline',			'Just another bug tracking software');
	Config::set('general.contact_email',		'youwish@gmail.com');
	Config::set('general.date_format',			'l jS \of F Y');
	Config::set('general.ga_id',				false); # UA-1823084-12

	Config::set('admin.user',					'admin');
	Config::set('admin.pass',					'1234');
	Config::set('su.user',						'su');
	Config::set('su.pass',						'4321');
?>
