<?php
	class aFramework_CSSCompressorModule extends aFramework_CodeCompressorModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$type = 'css';
			parent::run();
		}
	}
?>