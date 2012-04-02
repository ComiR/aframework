<?php
	class aFramework_DisqusModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$shortname = Config::get('disqus.shortname');

			if ($shortname) {
				self::$tplVars['shortname'] = $shortname;
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>
