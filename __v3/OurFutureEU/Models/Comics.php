<?php
	class Comics {
		public static function get () {
			$dh		= opendir(CURRENT_SITE_DIR . 'Files/comics/');
			$images	= array();

			while ($f = readdir($dh)) {
				if (in_array(end(explode('.', $f)), array('jpg', 'jpeg', 'gif', 'png'))) {
					$images[] = array(
						'url'	=> WEBROOT . CURRENT_SITE . '/Files/comics/' . $f, 
						'path'	=> DOCROOT . CURRENT_SITE . '/Files/comics/' . $f
					);
				}
			}

			if (count($images)) {
				usort($images, array('self', 'sortImagesByDate'));

				return $images;
			}

			return false;
		}

		public static function getLatestComic () {
			$images = self::get();

			return $images[0];
		}

		private static function sortImagesByDate ($a, $b) {
			$aDate = filemtime($a['path']);
			$bDate = filemtime($b['path']);

			if($aDate == $bDate) {
				return 0;
			}

			return ($aDate > $bDate) ? -1 : 1;
		}
	}
?>
