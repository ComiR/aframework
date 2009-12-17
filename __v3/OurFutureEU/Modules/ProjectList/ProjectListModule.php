<?php
	class OurFutureEU_ProjectListModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$allPages		= Pages::get();
			$projectPages	= array();

			foreach ($allPages as $page) {
				if (!$page['in_navigation'] and $page['url_str'] != 'home') {
					$projectPages[] = $page;
				}
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
