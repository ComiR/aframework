<?php
	class aFramework_BaseModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			self::$tplVars['body_id']			= strtolower(ccFix(Router::$params['controller'], '-'));
			self::$tplVars['html_title']		= Router::$params['controller'] == 'Home' ? Config::get('general.site_tagline') : ccFix(Router::$params['controller'], ' ');
			self::$tplVars['meta_description']	= '';
			self::$tplVars['meta_keywords']		= '';
			self::$tplVars['style']				= isset($_COOKIE['style']) ? $_COOKIE['style'] : Config::get('general.default_style');

			# Set canonical URLs for everything with a query string
			if (!empty($_SERVER['QUERY_STRING'])) {
				self::$tplVars['canonical_url'] = currPageURL(true);
			}

			# Allow a noindex-attribute in controller-XML-files
			$controllerPath = DOCROOT . CURRENT_SITE . '/Controllers/' . Router::$params['controller'] . '.xml';

			if (
				(
					!isset(self::$tplVars['noindex']) or 
					!self::$tplVars['noindex']
				) and 
				file_exists($controllerPath) and 
				strpos(file_get_contents($controllerPath), 'noindex="true"') !== false
			) {
				self::$tplVars['noindex'] = true;
			}
		}
	}
?>
