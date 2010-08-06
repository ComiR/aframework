<?php
	class BudhistorikSE_ObjectsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['objects'] = Objects::get();
		}
	}
?>
