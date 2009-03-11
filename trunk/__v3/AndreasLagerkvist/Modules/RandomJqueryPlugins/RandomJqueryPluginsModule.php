<?php
	class AndreasLagerkvist_RandomJqueryPluginsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if ( !(self::$tplVars['plugins'] = JqueryPlugins::get()) ) {
				self::$tplFile = false;
			}
			else {
				shuffle(self::$tplVars['plugins']);
				self::$tplVars['plugins'] = array_slice(self::$tplVars['plugins'], 0, Config::get('alcom.num_random_plugins'));
			}
		}
	}
?>