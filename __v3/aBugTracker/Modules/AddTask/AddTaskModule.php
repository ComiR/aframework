<?php
	class aBugTracker_AddTaskModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# Get the project we're on
			if (!($project = BTProjects::getByURLStr(Router::$params['project_url_str']))) {
				return self::$tplFile = false;
			}

			# Create the form (give all the fields values from POST)
			$form = new FormHandler();

			$form->addValuesArray($_POST);

			# Add all the fields
			$form->addField(array(
				'name'		=> 'title', 
				'title'		=> Lang::get('Title of Task'),
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'priority', 
				'title'		=> Lang::get('Priority'),
				'type'		=> 'select', 
				'options'	=> array(
					'Idea'			=> Lang::get('Idea'), 
					'Must Have'		=> Lang::get('Must Have'), 
					'Immediately'	=> Lang::get('Immediately')
				), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'state', 
				'title'		=> Lang::get('State'),
				'type'		=> 'select', 
				'options'	=> array(
					'New'			=> Lang::get('New'), 
					'In Progress'	=> Lang::get('In Progress'), 
					'Done'			=> Lang::get('Done')
				), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'content', 
				'title'		=> Lang::get('Description'), 
				'type'		=> 'textarea',
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'author',
				'validation'=> 'email',  
				'title'		=> Lang::get('Your E-mail'), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'bt_projects_id', 
				'type'		=> 'hidden', 
				'value'		=> $project['bt_projects_id']
			));
			$form->addField(array(
				'name'		=> 'add_task_submit', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));

			# User is submitting form
			# Make sure form is valid (true => check for spam as well)
			if (isset($_POST['add_task_submit']) and $form->validate(true)) {
				# Add new task
				BTTasks::insert($_POST);

				# Redirect after POST
				redirect('?added_site');
			}

			# Form has been submitted
			if (isset($_GET['added_site'])) {
				self::$tplFile = 'ThankYou';
			}
			# Form has NOT been submitted
			else {
				# Assign form HTML to template vars
				self::$tplVars['project']	= $project;
				self::$tplVars['form_html']	= $form->asHTML();
			}
		}
	}
?>
