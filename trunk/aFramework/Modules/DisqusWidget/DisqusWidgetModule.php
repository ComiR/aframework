<?php
	class aFramework_DisqusWidgetModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$shortname = Config::get('disqus.shortname');

			if ($shortname) {
				self::$tplVars['num_items'] = Config::get('ablog.num_recent_comments');
				self::$tplVars['shortname'] = $shortname;
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>
