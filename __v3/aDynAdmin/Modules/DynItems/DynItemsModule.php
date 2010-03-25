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
				redirect(msg('Deleted Item', 'The item was successfully deleted.'));
			}
		}

		public static function showTheItems () {
			$page		= isset($_GET['page']) ? $_GET['page'] : 0;
			$limit		= Config::get('adynadmin.num_items_per_page');
			$start		= ($page - 1) * $limit;
			$sort		= isset($_GET['sort']) ? $_GET['sort'] : 1;
			$order		= isset($_GET['order']) ? $_GET['order'] : 'ASC';
			$fullTable	= DynItem::getFullTable(Router::$params['table_name'], $sort, $order, 0, 100000000000, explode(',', Config::get('lang.allowed_langs')));

			if (!count($fullTable['rows'])) {
				self::$tplFile = 'NoItems';

				if ($start) {
					FourOFour::run();
				}

				return false;
			}

			# Pagination
			aFramework_PaginationModule::$tplVars['num_items']	= count($fullTable['rows']);
			aFramework_PaginationModule::$tplVars['page']		= $page;
			aFramework_PaginationModule::$tplVars['limit']		= $limit;
			aFramework_PaginationModule::$tplVars['url']		= appendToQryStr('page=%s');

			$fullTable['title']			= preg_replace('/^' . CURRENT_LANG . '_/', '', $fullTable['title']);
			$fullTable['rows']			= array_splice($fullTable['rows'], $start, $limit);

			self::$tplVars['sort']		= $sort;
			self::$tplVars['order']		= $order;
			self::$tplVars['new_order']	= $order == 'ASC' ? 'DESC' : 'ASC';
			self::$tplVars['table']		= $fullTable;
		}
	}
?>
