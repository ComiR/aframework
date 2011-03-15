<?php
	class aFramework_StylesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['styles'] = Styles::get();
		}
	}
?>
