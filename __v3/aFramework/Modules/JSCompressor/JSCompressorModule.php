<?php
	class aFramework_JSCompressorModule extends aFramework_CodeCompressorModule {
		public static function run() {
			self::$type = 'js';
			self::$exclude = array();

			parent::run();
		}
	}
?>