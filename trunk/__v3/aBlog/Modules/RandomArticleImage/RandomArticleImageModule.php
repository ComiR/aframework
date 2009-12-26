<?php
	class aBlog_RandomArticleImageModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$images = Articles::getImages();

			self::$tplVars['image'] = $images[array_rand($images)];
		}
	}
?>
