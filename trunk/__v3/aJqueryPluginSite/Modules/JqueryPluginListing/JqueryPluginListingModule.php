<?php
	class aJqueryPluginSite_JqueryPluginListingModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			self::$tplVars['plugins'] = JqueryPlugins::get();
		}
	}
?>