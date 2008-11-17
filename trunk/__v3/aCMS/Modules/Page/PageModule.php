<?php
	class aCMS_PageModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			self::showThePage();

			if(isset($_POST['page_submit']) and ADMIN) {
				self::updatePage($_POST);
			}
		}

		private static function showThePage() {
			# Try to get $get.url_str, else get home-page
			$page = Pages::getPageByUrlStr(isset($_GET['url_str']) ? $_GET['url_str'] : 'home');

			# If page didn't exist, no url_str is set and we're admin
			if(!$page and !isset($_GET['url_str']) and ADMIN) {
				aFramework_BaseModule::$tplVars['html_title'] = 'Add a page';
			}
			# No page exists
			elseif(!$page) {
				FourOFour::run();
			}
			# We found a page
			else {
				self::$tplVars = $page;

				aFramework_BaseModule::$tplVars['html_title']		= $page['title'];
				aFramework_BaseModule::$tplVars['meta_description']	= $page['meta_description'];
				aFramework_BaseModule::$tplVars['meta_keywords']	= $page['meta_keywords'];
			}
		}

		private static function updatePage($row) {
			
		}
	}
?>