<?php
	class PhotoAlbums {
		public static function get () {
			$path = Router::urlForFile('aPhotoAlbum/', CURRENT_SITE, DOCROOT);

			if (!is_dir($path)) {
				return false;
			}

			$dh = opendir($path);
			$albums = array();

			while ($f = readdir($dh)) {
				if ('..' != $f and '.' != $f and is_dir($path . $f)) {
					$albums[] = self::getByName($f);
				}
			}

			return count($albums) ? $albums : false;
		}

		public static function getByName ($name) {
			$name = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $name)));
			$path = Router::urlForFile("aPhotoAlbum/$name/", CURRENT_SITE, DOCROOT);

			if (!is_dir($path)) {
				return false;
			}

			$album = array(
				'name'			=> $name, 
				'album_name'	=> $name, 
				'title'			=> ucwords(str_replace(array('-', '_'), ' ', $name)), 
				'photos'		=> Photos::getPhotosByAlbumName($name)
			);

			return $album;
		}

		public static function insert ($name) {
			$aPhotoAlbumPath = Router::urlForFile('aPhotoAlbum/', CURRENT_SITE, DOCROOT);

			if (!is_dir($aPhotoAlbumPath)) {
				mkdir($aPhotoAlbumPath);
			}

			$name = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $name)));
			$path = Router::urlForFile("aPhotoAlbum/$name/", CURRENT_SITE, DOCROOT);

			if (is_dir($path)) {
				return false;
			}

			return mkdir($path);
		}

		public static function delete ($name) {
			$name = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $name)));
			$path = Router::urlForFile("aPhotoAlbum/$name/", CURRENT_SITE, DOCROOT);

			if (is_dir($path)) {
				Photos::deletePhotosInAlbum($name);

				return rmdir($path);
			}

			return false;
		}
	}
?>
