<?php
	class BudhistorikSE_OfficesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['offices'] = Offices::get();
		}
	}
?>
