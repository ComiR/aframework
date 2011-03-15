<?php
	class BudhistorikSE_UserObjectsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['objects'] = Objects::getByUsersID(Router::$params['users_id']);
		}
	}
?>
