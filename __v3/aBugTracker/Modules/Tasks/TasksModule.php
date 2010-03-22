<?php
	class aBugTracker_TasksModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['project'] = BTProjects::getByURLStr(Router::$params['project_url_str']))) {
				FourOFour::run();
			}

			self::$tplVars['project']['tasks'] = BTTasks::getByProjectsID(self::$tplVars['project']['bt_projects_id'], 'priority', 'DESC');
		}
	}
?>
