<?php
	class OurFutureEU_LatestComicModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$dh		= opendir(CURRENT_SITE_DIR . 'Files/comics/');
			$image	= false;

			while ($f = readdir($dh)) {
				if (!is_dir($f)) {
					$image = $f;

					break;
				}
			}

			if ($image) {
				self::$tplVars['image'] = array(
					'url'	=> WEBROOT . CURRENT_SITE . '/Files/comics/' . $image
				);
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>
