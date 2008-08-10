<?php
	class aFramework_BaseModule extends Module {
		public static function run() {
			self::$tplVars['body_id']			= strtolower(ccFix($_GET['controller'], '-'));
			self::$tplVars['html_title']		= ccFix($_GET['controller'], ' ');
			self::$tplVars['meta_description']	= '';
			self::$tplVars['meta_keywords']		= '';
			self::$tplVars['style']				= (isset($_COOKIE['style'])) ? $_COOKIE['style'] : DEFAULT_STYLE;
		}
	}
?>