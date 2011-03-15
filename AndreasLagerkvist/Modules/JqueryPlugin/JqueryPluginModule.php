<?php
	class AndreasLagerkvist_JqueryPluginModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset(Router::$params['url_str'])) {
				self::$tplVars['plugin'] = JqueryPlugins::getByUrlStr(Router::$params['url_str']);

				if (!self::$tplVars['plugin']) {
					FourOFour::run();
				}
				else {
					aFramework_BaseModule::$tplVars['html_title']	= 'jQuery ' . self::$tplVars['plugin']['title'];
					aFramework_BaseModule::$tplVars['scripts']		= self::$tplVars['plugin']['example_js'];
				}
			}
			else {
				FourOFour::run();
			}
		}
	}
?>