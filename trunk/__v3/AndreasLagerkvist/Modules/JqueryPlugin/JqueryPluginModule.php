<?php
	class AndreasLagerkvist_JqueryPluginModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(isset($_GET['url_str'])) {
				self::$tplVars['plugin'] = JqueryPlugins::getByUrlStr($_GET['url_str']);

				if(!self::$tplVars['plugin']) {
					FourOFour::run();
				}
				else {
					aFramework_BaseModule::$tplVars['html_title'] = 'jQuery ' .self::$tplVars['plugin']['title'];
				}
			}
			else {
				FourOFour::run();
			}
		}
	}
?>
