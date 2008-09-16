<?php
	class aJqueryPluginSite_JqueryPluginListingModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$tplVars = array();
			self::$tplFile = true;
			self::$forceController = false;

			self::$tplVars['plugins'] = JqueryPlugins::get();
		}
	}
?>