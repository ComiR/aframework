<?php
	class aBugTracker_TasksModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['project'] = BTProjects::getByURLStr(Router::$params['project_url_str']))) {
				FourOFour::run();
			}

			$tasks = BTTasks::getByProjectsID(self::$tplVars['project']['bt_projects_id'], 'pub_date', 'DESC');

			# HTML title
			aFramework_BaseModule::$tplVars['html_title'] = Lang::get('Tasks for %0', array(self::$tplVars['project']['title']));

			# Divide the tasks into groups of priority
			$urgentTasks	= array();
			$mustHaveTasks	= array();
			$ideaTasks		= array();

			if ($tasks) {
				foreach ($tasks as $task) {
					if ($task['priority'] == 'Urgent') {
						$urgentTasks[] = $task;
					}
					elseif ($task['priority'] == 'Must Have') {
						$mustHaveTasks[] = $task;
					}
					else {
						$ideaTasks[] = $task;
					}
				}
			}

			self::$tplVars['all_tasks']			= $tasks;
			self::$tplVars['urgent_tasks']		= $urgentTasks;
			self::$tplVars['must_have_tasks']	= $mustHaveTasks;
			self::$tplVars['idea_tasks']		= $ideaTasks;
		}
	}
?>
