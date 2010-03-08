<?php
	class aDynAdmin_DynItemsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!SU) {
				FourOFour::run();
			}

			if (isset($_POST['delete_dyn_item'])) {
				self::deleteItem($_POST['table_name'], $_POST['item_id']);
			}

			self::showTheItems();
		}

		public static function deleteItem ($tableName, $id) {
			DynItem::delete($tableName, $id);

			if (!XHR) {
				redirect(appendToQryStr('deleted_item=', false));
			}
		}

		public static function showTheItems () {
			$sort		= isset($_GET['sort']) ? $_GET['sort'] : 1;
			$order		= isset($_GET['order']) ? $_GET['order'] : 'ASC';
			$start		= isset($_GET['start']) ? $_GET['start'] : 0;
			$fullTable	= DynItem::getFullTable(Router::$params['table_name'], $sort, $order, $start, explode(',', Config::get('lang.allowed_langs')));

			if (!count($fullTable['rows'])) {
				self::$tplFile = 'NoItems';

				if ($start) {
					FourOFour::run();
				}
			}

			$fullTable['title']			= preg_replace('/^' . CURRENT_LANG . '_/', '', $fullTable['title']);

			self::$tplVars['sort']		= $sort;
			self::$tplVars['order']		= $order;
			self::$tplVars['new_order']	= $order == 'ASC' ? 'DESC' : 'ASC';
			self::$tplVars['start']		= $start;
			self::$tplVars['table']		= $fullTable;
		}
	}
?>
