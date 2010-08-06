<?php
	class BudhistorikSE_UserModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$id = Router::$params['users_id'];
			self::$tplVars['user'] = Users::getById($id);
		}
	}
?>
