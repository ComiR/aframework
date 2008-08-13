<?php
	class aFramework_BreadcrumbsModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$tplVars['crumbs'] = self::getBreadcrumbs();

			if(!self::$tplVars['crumbs']) {
				self::$tplFile = false;
			}
		}

		private static function getBreadcrumbs() {
			$cols		= array();
			$cols[0]	= array('title' => SITE_TITLE, 'url' => Router::urlFor('Home'));
			$dirs		= explode('/', $_SERVER['REQUEST_URI']);
			$validDirs	= array();
			$i			= 1;
			$prevUrl	= '';

			foreach($dirs as $dir) {
				if(0 < strlen($dir) and 'index.php' != $dir and '?' != substr($dir, 0, 1)) {
					$validDirs[] = $dir;
				}
			}

			$dirs		= $validDirs;
			$numDirs	= count($dirs);

			foreach($dirs as $dir) {
				$url		= $i == $numDirs ? false : "$prevUrl/$dir/";
				$cols[$i++]	= array('title' => ucwords(str_replace('-', ' ', $dir)), 'url' => $url);
				$prevUrl	= "$prevUrl/$dir";
			}

			return count($cols) > 1 ? $cols : false;
		}
	}
?>