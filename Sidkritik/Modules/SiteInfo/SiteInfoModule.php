<?php
	class Sidkritik_SiteInfoModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset(Router::$params['url_str'])) {
				self::$tplVars['site'] = Sites::get('sites_id', 'ASC', 0, 1, 'url_str = "' . Router::$params['url_str'] . '"');

				if (!self::$tplVars['site']) {
					FourOFour::run();
				}
				else {
					aFramework_BaseModule::$tplVars['html_title'] = self::$tplVars['site']['title'];
				}
			}
			else {
				FourOFour::run();
			}
		}
	}
?>
