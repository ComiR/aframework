<?php
	class AgnesEkman_GalleryModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['images'] = Articles::getImages();
		}
	}
?>