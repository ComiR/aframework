<?php
	class Sidkritik_SiteModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset(Sidkritik_SiteInfoModule::$tplVars['site'])) {
				self::$tplVars['site'] = Sidkritik_SiteInfoModule::$tplVars['site'];
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>
