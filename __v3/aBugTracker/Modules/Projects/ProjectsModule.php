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
	}
?>
