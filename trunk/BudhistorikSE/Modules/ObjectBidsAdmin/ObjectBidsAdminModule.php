<?php
	class BudhistorikSE_ObjectBidsAdminModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!USER) {
				FourOFour::run();
			}

			self::$tplVars['bids'] = Bids::getByObjectsID(Router::$params['objects_id']);

			# Mark a bid as active/inactive
			if (isset($_POST['toggle_active'])) {
				$bid	= Bids::getByID($_POST['bids_id']);
				$active	= $bid['active'] ? 0 : 1;

				Bids::update($bid['bids_id'], array('active' => $active));

				if (!XHR) {
					redirect(msg('Uppdaterade budet', 'Budet uppdaterades utan problem.'));
				}
			}

			# The "add bid"-form
			self::addBidForm();
		}

		private static function addBidForm () {
			$form = new FormHandler('post', '', 'Lägg till');

			$form->addValuesArray($_POST);

			$form->addField(array(
				'name'		=> 'name', 
				'title'		=> 'Budgivarens namn',
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'id_number', 
				'title'		=> 'ID-nummer', 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'phone', 
				'title'		=> 'Telefonnummer',
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'amount', 
				'title'		=> 'Bud (i SEK)',
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'users_id', 
				'type'		=> 'hidden', 
				'value'		=> $_SESSION[USER_SESSION]['users_id']
			));
			$form->addField(array(
				'name'		=> 'objects_id', 
				'type'		=> 'hidden', 
				'value'		=> Router::$params['objects_id']
			));
			$form->addField(array(
				'name'		=> 'add_bid_submit', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));

			if (isset($_POST['add_bid_submit']) and $form->validate()) {
				$flName = explode(' ', $_POST['name']);

				Bids::insert(array(
					'users_id'		=> $_POST['users_id'], 
					'objects_id'	=> $_POST['objects_id'], 
					'first_name'	=> $flName[0], 
					'last_name'		=> $flName[1], 
					'id_number'		=> $_POST['id_number'], 
					'phone'			=> $_POST['phone'], 
					'amount'		=> $_POST['amount']
				));

				if (!XHR) {
					redirect(msg('Lade till budet', 'Budet lades till utan problem.'));
				}
			}

			self::$tplVars['form_html'] = $form->asHTML();
		}
	}
?>
