<?php
	class aFramework_CSSCompressorModule extends aFramework_CodeCompressorModule {
		public static function run() {
			self::$type = 'css';
			parent::run();
		}
	}
?>