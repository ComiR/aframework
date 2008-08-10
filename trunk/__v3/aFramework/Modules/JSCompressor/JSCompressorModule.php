<?php
	class aFramework_JSCompressorModule extends aFramework_CodeCompressorModule {
		public static function run() {
			self::$type = 'js';
			parent::run();
		}
	}
?>