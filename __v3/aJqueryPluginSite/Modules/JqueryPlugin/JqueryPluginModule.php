<?php
	class aJqueryPluginSite_JqueryPluginModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$tplVars = array();
			self::$tplFile = true;
			self::$forceController = false;

			if(isset($_GET['url_str'])) {
				self::$tplVars['plugin'] = JqueryPlugins::getByUrlStr($_GET['url_str']);

				if(!self::$tplVars['plugin']) {
					aFramework::$force404 = true;
				}
			}
			else {
				aFramework::$force404 = true;
			}
		}
	}
?>