<?php
	class BudhistorikSE_OfficeUsersModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['users'] = Users::getByOfficesId(Router::$params['offices_id']);
		}
	}
?>
