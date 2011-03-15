<?php
	class BudhistorikSE_OfficeModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['office'] = Offices::getById(Router::$params['offices_id']);
		}
	}
?>
