<?php
	class Sidkritik_Top5SitesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['sites'] = Sites::get('avg_rating', 'DESC', 0, 5);
		}
	}
?>
