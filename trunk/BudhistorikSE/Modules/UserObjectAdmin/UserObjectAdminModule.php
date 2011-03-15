<?php
	class BudhistorikSE_UserObjectAdminModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!USER) {
				FourOFour::run();
			}

			$object = false;

			if (isset(Router::$params['objects_id'])) {
				$object	= Objects::getByID(Router::$params['objects_id']);
				$form	= new FormHandler('post', '', 'Spara ändringar');

				$form->addValuesArray($object);
				$form->addValuesArray($_POST);
			}
			else {
				$form = new FormHandler('post', '', 'Lägg till objekt');

				$form->addValuesArray($_POST);
			}

			$form->addField(array(
				'name'		=> 'objects_id', 
				'value'		=> $object ? $object['objects_id'] : '0', 
				'type'		=> 'hidden'
			));
			$form->addField(array(
				'name'		=> 'users_id', 
				'value'		=> $_SESSION[USER_SESSION]['users_id'], 
				'type'		=> 'hidden'
			));
			$form->addField(array(
				'name'		=> 'address', 
				'title'		=> 'Adress', 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'postal_code', 
				'title'		=> 'Postnummer', 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'city', 
				'title'		=> 'Stad', 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'apartment_num', 
				'title'		=> 'Lägenhetsnummer', 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'starting_price', 
				'title'		=> 'Utropspris', 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'start_date', 
				'title'		=> 'Startdatum', 
				'value'		=> date('Y-m-d H:i:s'), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'end_date', 
				'title'		=> 'Slutdatum', 
				'value'		=> date('Y-m-d H:i:s', time() + 1814400), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'sold', 
				'title'		=> 'Såld', 
				'type'		=> 'select', 
				'options'	=> array(
					'0'		=> 'Nej', 
					'1'		=> 'Ja'
				)
			));
			$form->addField(array(
				'name'		=> 'description', 
				'title'		=> 'Beskrivning', 
				'type'		=> 'textarea', 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'url', 
				'title'		=> 'URL', 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'user_object_admin_submit', 
				'value'		=> '1', 
				'type'		=> 'hidden'
			));

			if (isset($_POST['user_object_admin_submit']) and $form->validate()) {
				if (!$_POST['objects_id']) {
					Objects::insert($_POST);
				}
				else {
					Objects::update($_POST['objects_id'], $_POST);
				}

				if (!XHR) {
					redirect(msg('Ändringar sparade', 'Ändringarna sparades utan problem.'));
				}
			}

			self::$tplVars['form_html'] = $form->asHTML();
		}
	}
?>
