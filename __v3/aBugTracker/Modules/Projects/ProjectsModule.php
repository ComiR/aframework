<?php
	class aBugTracker_ProjectsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['projects'] = BTProjects::get())) {
				return self::$tplFile = false;
			}
		}
	}
?>
