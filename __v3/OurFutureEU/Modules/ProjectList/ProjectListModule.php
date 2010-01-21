<?php
	class OurFutureEU_ProjectListModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$allPages		= Pages::get('priority');
			$projectPages	= array();
			$currPageURL	= currPageURL();

			foreach ($allPages as $page) {
				if (!$page['in_navigation'] and substr($page['url_str'], 0, 2) != '__') {
					$page['selected']	= strstr($currPageURL, $page['url_str']) ? true : false;
					$projectPages[]		= $page;
				}
			}

			if (Router::getController() == 'ProjectPage') {
				self::$tplVars['only_first_word'] = true;
			}

			if (count($projectPages)) {
				self::$tplVars['projects'] = $projectPages;
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>
