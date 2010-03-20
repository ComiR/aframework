<?php
	class aBugTracker_TasksModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['project'] = BTProjects::getByID(Router::$params['bt_projects_id']))) {
				FourOFour::run();
			}

			self::$tplVars['project']['tasks'] = BTTasks::getByProjectsID(Router::$params['bt_projects_id']);
		}
	}
?>
