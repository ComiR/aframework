<?php
	class aFramework_BaseModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$tplVars = array();
			self::$tplFile = true;
			self::$forceController = false;

			self::$tplVars['body_id']			= strtolower(ccFix($_GET['controller'], '-'));
			self::$tplVars['html_title']		= ccFix($_GET['controller'], ' ');
			self::$tplVars['meta_description']	= '';
			self::$tplVars['meta_keywords']		= '';
			self::$tplVars['style']				= (isset($_COOKIE['style'])) ? $_COOKIE['style'] : DEFAULT_STYLE;
		}
	}
?>