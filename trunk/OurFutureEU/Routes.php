<?php
	return array(
		'/' . Lang::get('url.comics') . '/'							=> 'Comics', 
		'/:url_str(' . Lang::get('url.results') . ')/'				=> 'ResultsPage', 
		'/:url_str(' . Lang::get('url.documents') . ')/'			=> 'DocumentPage', 
		'/:url_str(' . Lang::get('url.contact-information') . ')/'	=> 'ContactPage', 
		'/:url_str(' . Lang::get('url.our-projects') . ')/'			=> 'ProjectsPage', 
		'/' . Lang::get('url.our-projects') . '/:url_str/'			=> 'ProjectPage'
	);
?>
