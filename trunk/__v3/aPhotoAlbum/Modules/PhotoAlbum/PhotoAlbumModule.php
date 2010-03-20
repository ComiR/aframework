<?php
	class aPhotoAlbum_PhotoAlbumModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (SU and isset($_POST['delete_photo'])) {
				if (Photos::delete($_POST['photo_name'], $_POST['album_name'])) {
					if (!XHR) {
						redirect(msg('Deleted Photo', 'The photo was successfully deleted.'));
					}
				}
				elseif (!XHR) {
					redirect(msg('Error Deleting Photo', 'An error occurred while deleting the photo. Please try again.', true));
				}
			}
			if (ADMIN and isset($_POST['insert_photo'])) {
				if (Photos::insert($_FILES['photo'], $_POST['album_name'])) {
					if (!XHR) {
						redirect(msg('Uploaded Photo', 'The photo was successfully uploaded.'));
					}
				}
				elseif (!XHR) {
					redirect(msg('Error Uploading Photo', 'An error occurred while uploading the photo. Please try again.', true));
				}
			}

			if (!(self::$tplVars['album'] = PhotoAlbums::getByName(Router::$params['album_name']))) {
				FourOFour::run();
			}
		}
	}
?>
