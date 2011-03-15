<?php
	class OurFutureEU_ComicsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['upload_image']) and ADMIN) {
				self::uploadImage();
			}
			if (isset($_POST['delete_comic']) and SU) {
				self::deleteImage();
			}

			if (!(self::$tplVars['images'] = Comics::get())) {
				return self::$tplFile = false;
			}
		}

		private static function deleteImage () {
			$path = DOCROOT . CURRENT_SITE . '/Files/comics/' . basename($_POST['name']);

			if (file_exists($path)) {
				unlink($path);
				redirect(msg('Deleted Image', 'The image was successfully deleted.'));
			}
			else {
				redirect(msg('Error Deleting Image', "There was an error deleting the image. The file doesn't seem to exist. Please try again."));
			}
		}

		private static function uploadImage () {
			$name = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', $_FILES['image']['name']));
			$path = Router::urlForFile('comics/' . $name, 'OurFutureEU', DOCROOT);

			if (move_uploaded_file($_FILES['image']['tmp_name'], $path)) {
				redirect(msg('Uploaded Image', 'The image was successfully uploaded.'));
			}
			else {
				redirect(msg('Error Uploading Image', 'An error occurred while uploading the image. Please try again.', true));
			}			
		}
	}
?>
