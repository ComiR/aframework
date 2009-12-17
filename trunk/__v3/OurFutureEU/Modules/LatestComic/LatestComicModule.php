<?php
	class OurFutureEU_LatestComicModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['upload_image']) and ADMIN) {
				self::uploadImage();
			}

			self::showTheLatestComic();
		}

		private static function showTheLatestComic () {			
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

				self::$tplVars['image']	= $images[0];
				self::$tplVars['images']= $images;
			}
			else {
				self::$tplFile = false;
			}
		}

		private static function sortImagesByDate ($a, $b) {
			$aDate = filemtime($a['path']);
			$bDate = filemtime($b['path']);

			if($aDate == $bDate) {
				return 0;
			}

			return ($aDate > $bDate) ? -1 : 1;
		}

		private static function uploadImage () {
			$name = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', $_FILES['image']['name']));
			$path = Router::urlForFile('comics/' . $name, 'OurFutureEU', DOCROOT);

			if (move_uploaded_file($_FILES['image']['tmp_name'], $path)) {
				redirect('?uploaded_image');
			}
			else {
				redirect('?fail');
			}			
		}
	}
?>
