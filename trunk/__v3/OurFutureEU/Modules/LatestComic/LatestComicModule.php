<?php
	class OurFutureEU_LatestComicModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['image'] = Comics::getLatestComic())) {
				self::$tplFile = false;
			}
		}
	}
?>
