<?php
	class aFramework_BaseModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			self::$tplVars['body_id']			= strtolower(ccFix($_GET['controller'], '-'));
			self::$tplVars['html_title']		= $_GET['controller'] == 'Home' ? Config::get('general.site_tagline') : ccFix($_GET['controller'], ' ');
			self::$tplVars['meta_description']	= '';
			self::$tplVars['meta_keywords']		= '';
			self::$tplVars['style']				= (isset($_COOKIE['style'])) ? $_COOKIE['style'] : Config::get('general.default_style');
			self::$tplVars['noindex']			= !empty($_SERVER['QUERY_STRING']);

			# Allow a noindex-attribute in controller-XML-files
			$controllerPath = DOCROOT . CURRENT_SITE . '/Controllers/' . $_GET['controller'] . '.xml';

			if (
				!self::$tplVars['noindex'] and 
				file_exists($controllerPath) and 
				strpos(file_get_contents($controllerPath), 'noindex="true"') !== false
			) {
				self::$tplVars['noindex'] = true;
			}
		}
	}
?>