<?php
	class BudhistorikSE_OfficeObjectsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['objects'] = Objects::getByOfficesId(Router::$params['offices_id']);
		}
	}
?>
