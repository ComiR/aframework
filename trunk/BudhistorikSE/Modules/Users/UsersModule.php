<?php
	class BudhistorikSE_UsersModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['users'] = Users::get();
		}
	}
?>
