<?php
	class App_CSSCompressorModule extends aFramework_CSSCompressorModule {
		public static function run() {
			self::$exclude = array('print.css');

			parent::run();
		}
	}
?>