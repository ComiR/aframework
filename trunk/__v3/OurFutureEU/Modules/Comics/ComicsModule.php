<?php
	class OurFutureEU_ComicsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['images'] = Comics::get())) {
				self::$tplFile = false;
			}
		}
	}
?>
