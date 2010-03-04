<?php
	class OurFutureEU_ActivitiesAdminModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (
				isset($_POST['username']) and 
				$_POST['username'] == Config::get('activities_admin.username') 
				and isset($_POST['password']) and 
				$_POST['password'] == Config::get('activities_admin.password')
			) {
				self::handleAddActivity();
				self::handleDeleteActivity();

				self::$tplVars['activities']	= Activities::get();
				self::$tplVars['username']		= $_POST['username'];
				self::$tplVars['password']		= $_POST['password'];
			}
			else {
				self::$tplFile = 'Login';
			}
		}

		private static function handleDeleteActivity () {
			if (isset($_POST['delete_activity'])) {
				Activities::delete($_POST['activities_id']);

				# Redirect after POST (no, loses login)
			#	redirect('?deleted_activity');
			}
		}

		private static function HandleAddActivity () {
			$form = new FormHandler();

			$form->addValuesArray($_POST);
			$form->addValuesArray(array('pub_date' => date('Y-m-d H:i:s')));

			$form->addField(array(
				'name'		=> 'title', 
				'title'		=> Lang::get('Title'),
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'content', 
				'title'		=> Lang::get('Content'), 
				'type'		=> 'textarea',
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'pub_date', 
				'title'		=> Lang::get('Date'), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'add_activity', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));
			$form->addField(array(
				'name'		=> 'username', 
				'type'		=> 'hidden', 
				'value'		=> $_POST['username']
			));
			$form->addField(array(
				'name'		=> 'password', 
				'type'		=> 'hidden', 
				'value'		=> $_POST['username']
			));

			if (isset($_POST['add_activity']) and $form->validate()) {
				Activities::insert(array(
					'title'			=> $_POST['title'], 
					'content'		=> $_POST['content'], 
					'pub_date'		=> $_POST['pub_date']
				));

				# Redirect after POST (no, loses login)
			#	redirect('?added_activity');
			}

			self::$tplVars['form_html'] = $form->asHTML();
		}
	}
?>
