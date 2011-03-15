<?php
	return array(
		'/' . Lang::get('url.photo-albums') . '/'							=> 'PhotoAlbums', 
		'/' . Lang::get('url.photo-albums') . '/:album_name/'				=> 'PhotoAlbum', 
		'/' . Lang::get('url.photo-albums') . '/:album_name/:photo_name/'	=> 'Photo'
	);
?>
