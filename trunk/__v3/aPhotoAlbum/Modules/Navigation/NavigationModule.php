<?php
	class aPhotoAlbum_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (Config::get('navigation.photo-albums')) {
				aFramework_NavigationModule::addItem(Lang::get('Photo Albums'), Router::urlFor('PhotoAlbums'));
			}
		}
	}
?>
