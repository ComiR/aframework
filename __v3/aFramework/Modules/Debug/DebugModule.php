<?php
	class aFramework_DebugModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplFile = ADMIN ? true : false;
		}
	}
?>
