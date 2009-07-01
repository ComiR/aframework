<?php
	class aFramework_CaptchaModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			Captcha::show(4, DOCROOT . 'aFramework/Files/fonts/catholic-school-girls.ttf');
		}
	}
?>