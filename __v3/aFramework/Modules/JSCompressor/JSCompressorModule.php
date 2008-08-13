<?php
	class aFramework_JSCompressorModule extends aFramework_CodeCompressorModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$type = 'js';
			parent::run();
		}
	}
?>