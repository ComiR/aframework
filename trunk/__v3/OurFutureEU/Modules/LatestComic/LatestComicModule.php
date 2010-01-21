<?php
	class OurFutureEU_LatestComicModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['upload_image']) and ADMIN) {
				self::uploadImage();
			}
			if (!(self::$tplVars['image'] = Comics::getLatestComic())) {
				self::$tplFile = false;
			}
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
