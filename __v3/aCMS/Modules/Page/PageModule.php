<?php
	class aCMS_PageModule extends Module {
		public static function run() {
			if(isset($_GET['url_str'])) {
				$page = Pages::getPageByUrlStr($_GET['url_str']);

				if(!$page) {
					self::$forceController = FOUR_O_FOUR_CONTROLLER;
				}
				else {
					self::$tplVars = $page;
					aFramework_BaseModule::$tplVars['html_title'] = $page['title'];
					aFramework_BaseModule::$tplVars['meta_description'] = $page['meta_description'];
					aFramework_BaseModule::$tplVars['meta_keywords'] = $page['meta_keywords'];
				}
			}
			else {
				self::$forceController = FOUR_O_FOUR_CONTROLLER;
			}
		}
	}
?>