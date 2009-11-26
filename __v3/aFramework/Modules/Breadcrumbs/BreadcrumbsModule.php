<?php
	class aFramework_BreadcrumbsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['crumbs'] = self::getBreadcrumbs())) {
				self::$tplFile = false;
			}
		}

		private static function getBreadcrumbs () {
			$cols		= array();
			$cols[0]	= array('title' => Config::get('general.site_title'), 'url' => Router::urlFor('Home'));
			$pathInfo	= isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';
			$dirs		= explode('/', str_replace('/' . CURRENT_LANG . '/', '/', $pathInfo));
			$validDirs	= array();
			$i			= 1;
			$prevUrl	= '';

			foreach ($dirs as $dir) {
				if (0 < strlen($dir) and 'index.php' != $dir and '?' != substr($dir, 0, 1)) {
					$validDirs[] = $dir;
				}
			}

			$dirs		= $validDirs;
			$numDirs	= count($dirs);

			foreach ($dirs as $dir) {
				$url		= str_replace('//', '/', ($i == $numDirs ? false : (USE_MOD_REWRITE ? WEBROOT : WEBROOT . 'index.php/') . "$prevUrl/$dir/"));
				$cols[$i++]	= array('title' => ucwords(str_replace('-', ' ', $dir)), 'url' => $url);
				$prevUrl	= "$prevUrl/$dir";
			}

			return count($cols) > 1 ? $cols : false;
		}
	}
?>
