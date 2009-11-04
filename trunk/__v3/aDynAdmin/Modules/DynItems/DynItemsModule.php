<?php
	class aDynAdmin_DynItemsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!ADMIN) {
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
			$sort	= isset($_GET['sort']) ? $_GET['sort'] : 1;
			$order	= isset($_GET['order']) ? $_GET['order'] : 'ASC';
			$start	= isset($_GET['start']) ? $_GET['start'] : 0;
			$res	= dbQry('SELECT * FROM ' . Router::$params['table_name'] . ' ORDER BY ' . $sort . ' ' . $order . ' LIMIT ' . $start . ', ' . Config::get('adynadmin.num_items_per_page'));
			$i		= 0;

			self::$tplVars['table'] = array(
				'name'			=> Router::$params['table_name'], 
				'title'			=> ucwords(str_replace('_', ' ', Router::$params['table_name'])), 
				'rows'			=> array(), 
				'properties'	=> array()
			);

			if (!mysql_num_rows($res)) {
				self::$tplFile = 'NoItems';

				if ($start) {
					FourOFour::run();
				}

				return false;
			}

			while ($row = mysql_fetch_assoc($res)) {
				if ($i++ == 0) {
					foreach ($row as $property => $value) {
						self::$tplVars['table']['properties'][] = array(
							'name'	=> $property, 
							'title'	=> ucwords(str_replace('_', ' ', $property))
						);
					}
				}

				self::$tplVars['table']['rows'][] = array(
					'id'			=> $row[Router::$params['table_name'] . '_id'], 
					'properties'	=> $row
				);
			}

			self::$tplVars['sort']		= $sort;
			self::$tplVars['order']		= $order;
			self::$tplVars['new_order']	= $order == 'ASC' ? 'DESC' : 'ASC';
			self::$tplVars['start']		= $start;
		}
	}
?>
