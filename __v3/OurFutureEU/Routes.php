<?php
	$documentPages = array(
		Lang::get('url.our-projects'),
		Lang::get('url.documents')
	);
	$contactPages = array(
		Lang::get('url.contact-information')
	);

	return array(
		'/:url_str(' . implode('|', $documentPages) . ')/'		=> 'DocumentPage', 
		'/:url_str(' . implode('|', $contactPages) . ')/'		=> 'ContactPage', 
		'/' . Lang::get('url.our-projects') . '/:url_str/'		=> 'ProjectPage'
	);
?>
