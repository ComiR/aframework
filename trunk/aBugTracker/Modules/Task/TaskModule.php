<?php
	class aBugTracker_TaskModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['task'] = BTTasks::getByURLStr(Router::$params['task_url_str'], Router::$params['project_url_str']))) {
				FourOFour::run();
			}

			# HTML title
			aFramework_BaseModule::$tplVars['html_title'] = self::$tplVars['task']['title'] . ' - ' . self::$tplVars['task']['project_title'];

			self::setUpEditForm();
		}

		private static function setUpEditForm () {
			$taskMod = self::$tplVars['task'];

			$taskMod['content'] = $taskMod['author'] = '';

			# Get all the sprints
			$sprints = BTSprints::get('title', 'ASC');
			$availableSprints = array('0' => '-- ' . Lang::get('No Sprint') . ' --');

			foreach ($sprints as $sprint) {
				$availableSprints[$sprint['bt_sprints_id']] = $sprint['title'];
			}

			# Create the form (give all the fields values from POST)
			$form = new FormHandler();

			$form->addValuesArray($taskMod);
			$form->addValuesArray($_POST);

			# Add all the fields
			$form->addField(array(
				'name'		=> 'priority', 
				'title'		=> Lang::get('Priority'),
				'type'		=> 'select', 
				'options'	=> array(
					'Idea'		=> Lang::get('Idea'), 
					'Must Have'	=> Lang::get('Must Have'), 
					'Urgent'	=> Lang::get('Urgent')
				)
			));
			$form->addField(array(
				'name'		=> 'state', 
				'title'		=> Lang::get('State'),
				'type'		=> 'select', 
				'options'	=> array(
					'New'			=> Lang::get('New'), 
					'In Progress'	=> Lang::get('In Progress'), 
					'Done'			=> Lang::get('Done')
				)
			));
			$form->addField(array(
				'name'		=> 'sprint_id', 
				'title'		=> Lang::get('Sprint'),
				'type'		=> 'select', 
				'options'	=> $availableSprints
			));
			$form->addField(array(
				'name'		=> 'content', 
				'title'		=> Lang::get('Add a Comment'), 
				'type'		=> 'textarea',
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'comment_email',
				'validation'=> 'email', 
				'title'		=> Lang::get('Your E-mail'), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'bt_tasks_id', 
				'type'		=> 'hidden', 
				'value'		=> self::$tplVars['task']['bt_tasks_id']
			));
			$form->addField(array(
				'name'		=> 'edit_task_submit', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));

			# User is submitting form
			# Make sure form is valid (true => check for spam as well)
			if (isset($_POST['edit_task_submit']) and $form->validate(true)) {
				# _Add_ to content-field, don't replace
				$newContent = self::$tplVars['task']['content'] 
									. "\n\n## ![](http://www.gravatar.com/avatar.php?gravatar_id=" 
									. md5($_POST['comment_email']) 
									. ') ' 
									. date(Config::get('general.date_format'))
									. "\n\n"
									. $_POST['content'];

				# Keep track of state changes
				if (self::$tplVars['task']['state'] != $_POST['state']) {
					$newContent .= "\n\nChanged state from \"" . self::$tplVars['task']['state'] . '" to "' . $_POST['state'] . '".';

					# If it's changed to 'In Progress' or 'Done', also change 'assigned'
					if (in_array($_POST['state'], array('In Progress', 'Done'))) {
						$_POST['assigned'] = $_POST['comment_email'];
						$newContent .= ' Now assigned to me.';
					}

					# If it's changed to 'Done' and is also part of a sprint, 
					# change the sprint_tasks fixed_date to today
					if ($_POST['state'] == 'Done' and self::$tplVars['task']['sprint_id']) {
						BTSprints::updateTaskFixedDate(self::$tplVars['task']['bt_tasks_id'], date('Y-m-d H:i:s'));
					}

					# If it _used to be_ done then remove date_fixed
					if (self::$tplVars['task']['state'] == 'Done') {
						BTSprints::updateTaskFixedDate(self::$tplVars['task']['bt_tasks_id'], '0000-00-00 00:00:00');
					}
				}

				# Keep track of priority changes
				if (self::$tplVars['task']['priority'] != $_POST['priority']) {
					$newContent .= "\n\nChanged priority from \"" . self::$tplVars['task']['priority'] . '" to "' . $_POST['priority'] . '".';
				}

				# Keep track fo sprint-changes
				if (self::$tplVars['task']['sprint_id'] != $_POST['sprint_id']) {
					# Delete old sprint_task
					BTSprints::removeTaskFromSprints(self::$tplVars['task']['bt_tasks_id']);

					# Add task to new sprint
					if ($_POST['sprint_id'] != 0) {
						BTSprints::addTaskToSprint(self::$tplVars['task']['bt_tasks_id'], $_POST['sprint_id']);
					}

					$newContent .= "\n\nChanged sprint from \"" . self::$tplVars['task']['sprint_id'] . '" to "' . $_POST['sprint_id'] . '".';
				}

				$_POST['content'] = $newContent;

				# Update task
				BTTasks::update($_POST['bt_tasks_id'], $_POST);

				# Redirect after POST
				redirect(msg('Updated Task', 'The task was successfully updated.'));
			}

			# Assign form HTML to template vars
			self::$tplVars['form_html']	= $form->asHTML();
		}
	}
?>
