<?php
	class aBugTracker_ProjectsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (ADMIN) {
				self::createAddProjectForm();
			}

			if (!(self::$tplVars['projects'] = BTProjects::get())) {
				return self::$tplFile = false;
			}
		}

		private static function createAddProjectForm () {
			# Create the form (give all the fields values from POST)
			$form = new FormHandler('post', '', Lang::get('Create Project'));

			$form->addValuesArray($_POST);

			# Add all the fields
			$form->addField(array(
				'name'		=> 'title', 
				'title'		=> Lang::get('Project Title'),
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'add_project_submit', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));

			# User is submitting form
			# Make sure form is valid
			if (isset($_POST['add_project_submit']) and $form->validate()) {
				BTProjects::insert($_POST);

				if (!XHR) {
					redirect(msg('Created Project', 'The project was successfully created.'));
				}
			}
			else {
				self::$tplVars['form_html'] = $form->asHTML();
			}
		}

		private static function popuplateTasks () {
			$ntid = array(
				'ablog' => 2, 
				'abugtracker' => 7, 
				'acms' => 3, 
				'adynadmin' => 9, 
				'aforum' => 10, 
				'aframework' => 1, 
				'aframeworkcom' => 5, 
				'amodpack' => 4, 
				'install' => 6, 
				'sidkritik' => 8
			);
			$path = '/home/ante/Desktop/tasks/';
			$dh = opendir($path);

			while ($f = readdir($dh)) {
				if (!in_array($f, array('..', '.'))) {
					$tasks = array_filter(array_map('trim', explode('@', file_get_contents($path . $f))));

					foreach ($tasks as $task) {
						$task	= array_filter(array_map('trim', explode("\n", $task)));
						$title	= $task[0];

						unset($task[0]);

						$task = trim(implode("\n\n", $task));

						BTTasks::insert(array(
							'bt_projects_id'	=> $ntid[$f], 
							'title'				=> $title, 
							'author'			=> 'powerbuoy@gmail.com', 
							'content'			=> $task, 
							'priority'			=> 'Must Have', 
							'state'				=> 'New'
						));
					}
				}
			}
		}
	}
?>
