<?php
	class BudhistorikSE_UserObjectsAdminModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!USER) {
				FourOFour::run();
			}

			self::$tplVars['objects'] = Objects::getByUsersID($_SESSION[USER_SESSION]['users_id']);

			foreach(self::$tplVars['objects'] as $object) {
				$id = $object['objects_id'];
				$bestBid = false;
				foreach(Bids::getByObjectsId($id) as $bid) {
					if ($bid['active'] == 1) {
						$bestBid = $bid;
						break;
					}
				}
				self::$tplVars['bids'][$id] = $bestBid;
			}

			# Mark an object as sold/not sold
			if (isset($_POST['toggle_sold'])) {
				$object	= Objects::getByID($_POST['objects_id']);
				$sold	= $object['sold'] ? 0 : 1;

				Objects::update($object['objects_id'], array('sold' => $sold));

				if (!XHR) {
					redirect(msg('Uppdaterade objektet', 'Objektet uppdaterades utan problem.'));
				}
			}
		}
	}
?>
