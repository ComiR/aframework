<?php
	class aFramework_StyleSwitcherModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['styles'] = Styles::get();
		}
	}
?>
