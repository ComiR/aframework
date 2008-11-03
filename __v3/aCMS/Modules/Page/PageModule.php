<?php
	class aCMS_PageModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			$page = Pages::getPageByUrlStr(isset($_GET['url_str']) ? $_GET['url_str'] : 'home');

			if(!$page) {
				FourOFour::run();
			}
			else {
				self::$tplVars = $page;

				aFramework_BaseModule::$tplVars['html_title']		= $page['title'];
				aFramework_BaseModule::$tplVars['meta_description']	= $page['meta_description'];
				aFramework_BaseModule::$tplVars['meta_keywords']	= $page['meta_keywords'];
			}
		}
	}
?>
