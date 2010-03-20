<?php
	class aPhotoAlbum_PhotoAlbumsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (SU and isset($_POST['delete_album'])) {
				if (PhotoAlbums::delete($_POST['album_name'])) {
					if (!XHR) {
						redirect(msg('Deleted Album', 'The album was successfully deleted.'));
					}
				}
				elseif (!XHR) {
					redirect(msg('Error Deleting Album', 'An error occurred while deleting the album. Please try again.', true));
				}
			}
			if (ADMIN and isset($_POST['insert_album'])) {
				if (PhotoAlbums::insert($_POST['album_name'])) {
					if (!XHR) {
						redirect(msg('Created Album', 'The album was successfully created.'));
					}
				}
				elseif (!XHR) {
					redirect(msg('Error Creating Album', 'An error occurred while creating the album. Please try again.', true));
				}
			}

			self::$tplVars['albums'] = PhotoAlbums::get();
		}
	}
?>
