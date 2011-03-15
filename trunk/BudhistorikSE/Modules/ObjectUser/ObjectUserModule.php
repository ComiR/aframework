<?php
	class BudhistorikSE_ObjectUserModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['user'] = Users::getByObjectsID(Router::$params['objects_id']);
		}
	}
?>
