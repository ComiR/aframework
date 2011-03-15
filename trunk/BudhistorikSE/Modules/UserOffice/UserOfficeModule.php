<?php
	class BudhistorikSE_UserOfficeModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['office'] = Offices::getByUsersID(Router::$params['users_id']);
		}
	}
?>
