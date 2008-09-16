<?php
	class aFramework_SkipNavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$tplVars = array();
			self::$tplFile = true;
			self::$forceController = false;

			$path			= self::getControllerPath(isset($_GET['controller']) ? $_GET['controller'] : false);
			$matches		= array();
			$contents		= file_get_contents($path);

			preg_match_all('/<wrapper name="(.*?)">/im', $contents, $matches);

			if(stristr($contents, '<Navigation')) {
				self::$tplVars['links'][] = array(
					'title'	=> 'navigation', 
					'url'	=> '#navigation'
				);
			}

			foreach($matches[1] as $wrapper) {
				if($wrapper != 'wrapper') {
					self::$tplVars['links'][] = array(
						'title'	=> str_replace('-', ' ', $wrapper), 
						'url'	=> '#' .$wrapper
					);
				}
			}

			if(!isset(self::$tplVars['links'])) {
				self::$tplFile = false;
			}
		}

		private static function getControllerPath($controller) {
			$sites = explode(' ', SITE_HIERARCHY);

			foreach($sites as $site) {
				$path = DOCROOT .$site .'/Controllers/' .$controller .'.xml';
				if(file_exists($path)) {
					return $path;
				}
			}
		}
	}
?>