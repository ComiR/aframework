<?php
	class Photos {
		public static function getByName ($name, $album) {
			$name		= strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $name)));
			$album		= strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $album)));
			$path		= Router::urlForFile("aPhotoAlbum/$album/$name", CURRENT_SITE, DOCROOT);
			$webPath	= Router::urlForFile("aPhotoAlbum/$album/$name", CURRENT_SITE, WEBROOT);
			$ext		= end(explode('.', $name));

			if (!file_exists($path) or !in_array($ext, array('jpg', 'png', 'jpeg', 'gif'))) {
				return false;
			}

			$photo = array(
				'name'			=> $name, 
				'photo_name'	=> $name, 
				'album_name'	=> $album, 
				'album_title'	=> ucwords(str_replace(array('-', '_'), ' ', $album)), 
				'ext'			=> $ext, 
				'title'			=> substr(ucwords(str_replace(array('-', '_'), ' ', $name)), 0, -(strlen($ext) + 1)), 
				'size'			=> filesize($path), 
				'src'			=> $webPath, 
				'src_thumb'		=> WEBROOT . 'aFramework/Lib/phpThumb/phpThumb.php?src=' . $path . '&amp;w=160', 
				'path'			=> $path
			);

			return $photo;
		}

		public static function getPhotosByAlbumName ($name) {
			$name		= strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $name)));
			$path		= Router::urlForFile("aPhotoAlbum/$name/", CURRENT_SITE, DOCROOT);
			$webPath	= Router::urlForFile("aPhotoAlbum/$name/", CURRENT_SITE, WEBROOT);

			if (!is_dir($path)) {
				return false;
			}

			$dh = opendir($path);
			$photos = array();

			while ($f = readdir($dh)) {
				if ($photo = self::getByName($f, $name)) {
					$photos[] = $photo;
				}
			}

			return count($photos) ? $photos : false;
		}

		public static function insert ($file, $album) {
			$name = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $file['name'])));
			$album = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $album)));
			$path = Router::urlForFile("aPhotoAlbum/$album/$name", CURRENT_SITE, DOCROOT);

			if (move_uploaded_file($file['tmp_name'], $path)) {
				return true;
			}

			return false;
		}

		public static function delete ($name, $album) {
			$name = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $name)));
			$album = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', str_replace(' ', '-', $album)));
			$path = Router::urlForFile("aPhotoAlbum/$album/$name", CURRENT_SITE, DOCROOT);

			if (file_exists($path)) {
				return unlink($path);
			}

			return false;
		}

		public static function deletePhotosInAlbum ($name) {
			$photos = self::getPhotosByAlbumName($name);

			foreach ($photos as $photo) {
				unlink($photo['path']);
			}
		}
	}
?>
