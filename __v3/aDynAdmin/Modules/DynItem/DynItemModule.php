<?php
	class aDynAdmin_DynItemModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!ADMIN) {
				FourOFour::run();
			}

			if (count($_POST)) {
				if (empty($_POST[Router::$params['table_name'] . '_id'])) {
					DynItem::insert(Router::$params['table_name'], $_POST);

					if (!XHR) {
						redirect(Router::urlFor('DynItem', array('table_name' => Router::$params['table_name'], 'item_id' => mysql_insert_id())));
					}
				}
				else {
					DynItem::update(Router::$params['table_name'], $_POST[Router::$params['table_name'] . '_id'], $_POST);

					if (!XHR) {
						redirect('?updated_item');
					}
				}
			}

			if (isset(Router::$params['item_id'])) {
				self::$tplVars['item'] = DynItem::getByID(Router::$params['table_name'], Router::$params['item_id']);
			}
			else {
				self::$tplVars['item'] = DynItem::getEmptyRow(Router::$params['table_name']);
			}
		}
	}
?>
