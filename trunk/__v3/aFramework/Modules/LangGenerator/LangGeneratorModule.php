<?php
	class aFramework_LangGeneratorModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$site					= isset($_GET['site']) ? $_GET['site'] : 'aFramework';
			self::$tplVars['langs']	= Lang::getLangsInDir(basename(DOCROOT . $site));
		}
	}
?>
