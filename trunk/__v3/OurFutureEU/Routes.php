<?php
	$documentPages = array(
		'our-projects',
		'documents'
	);
	$contactPages = array(
		'contact-information'
	);

	return array(
		'/:url_str(' . implode('|', $documentPages) . ')/'		=> 'DocumentPage', 
		'/:url_str(' . implode('|', $contactPages) . ')/'		=> 'ContactPage', 
		'/' . Lang::get('url.our-projects') . '/:url_str/'		=> 'ProjectPage'
	);
?>
