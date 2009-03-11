<?php
	class AndreasLagerkvist_JqueryPluginsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if ( !(self::$tplVars['plugins'] = JqueryPlugins::get()) ) {
				self::$tplFile = false;
			}
		}
	}
?>