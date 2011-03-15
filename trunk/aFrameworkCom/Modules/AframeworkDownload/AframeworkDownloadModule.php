<?php
	class aFrameworkCom_AframeworkDownloadModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['download'] = self::getLatestDownload();
		}

		private static function getLatestDownload () {
			$path		= CURRENT_SITE_DIR . '/Files/';
			$dh			= opendir($path);
			$download	= array();

			while ($f = readdir($dh)) {
				if (substr($f, 0, 10) == 'aFramework' and end(explode('.', $f)) == 'zip') {
					$download = array(
						'url'		=> WEBROOT . CURRENT_SITE . '/Files/' . $f, 
						'version'	=> ucwords(str_replace('-', ' ', substr($f, 11, -4))), 
						'filesize'	=> filesize($path . $f)
					);

					break;
				}
			}

			return count($download) ? $download : false;
		}
	}
?>
