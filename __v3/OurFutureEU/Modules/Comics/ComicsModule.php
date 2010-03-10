<?php
	class OurFutureEU_ComicsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['delete_comic']) and SU) {
				$path = DOCROOT . CURRENT_SITE . '/Files/comics/' . basename($_POST['name']);

				if (file_exists($path)) {
					unlink($path);
					redirect(msg('Deleted Comic', 'The comic was successfully deleted.'));
				}
				else {
					redirect(msg('Unable to Delete Comic', "There was an error deleting the comic. The file doesn't seem to exist. Please try again."));
				}
			}

			if (!(self::$tplVars['images'] = Comics::get())) {
				return self::$tplFile = false;
			}
		}
	}
?>
