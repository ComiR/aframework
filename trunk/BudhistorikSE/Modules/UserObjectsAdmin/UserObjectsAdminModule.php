<?php
	class BudhistorikSE_UserObjectsAdminModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!USER) {
				FourOFour::run();
			}

			# Grab all the user's objects
			$objects = Objects::getByUsersID($_SESSION[USER_SESSION]['users_id']);

			# And their highest bids
			foreach ($objects as $object) {
				$object['highest_bid']		= Bids::getHighestBidByObjectsID($object['objects_id']);
				self::$tplVars['objects'][]	= $object;
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
