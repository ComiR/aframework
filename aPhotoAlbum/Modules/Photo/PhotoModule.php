<?php
	class aPhotoAlbum_PhotoModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['photo'] = Photos::getByName(Router::$params['photo_name'], Router::$params['album_name']))) {
				FourOFour::run();
			}

			aFramework_BaseModule::$tplVars['html_title'] = self::$tplVars['photo']['title'] . ' - ' . self::$tplVars['photo']['album_title'] . ' - ' . Lang::get('All Photo Albums');
		}
	}
?>
