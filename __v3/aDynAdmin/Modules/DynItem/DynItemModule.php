<?php
	class aDynAdmin_DynItemModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!ADMIN) {
				FourOFour::run();
			}

			# Insert or update item
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

			# Show new/empty or existing item
			if (isset(Router::$params['item_id'])) {
				self::$tplVars['item']			= DynItem::getByID(Router::$params['table_name'], Router::$params['item_id'], explode(',', Config::get('general.allowed_langs')));
				self::$tplVars['edit_or_add']	= Lang::get('Edit');
			}
			else {
				self::$tplVars['item']			= DynItem::getEmptyRow(Router::$params['table_name']);
				self::$tplVars['edit_or_add']	= Lang::get('Add');
			}

			# Break out enum-values
			foreach (self::$tplVars['item'] as $field => $properties) {
				if (substr(self::$tplVars['item'][$field]['properties']['Type'], 0, 4) == 'enum') {
					$enumValues = substr(self::$tplVars['item'][$field]['properties']['Type'], 5);
					$enumValues = substr($enumValues, 0, -1);
					$enumValues = explode(',', $enumValues);
					$enums		= array();

					foreach ($enumValues as $enumValue) {
						$enums[] = str_replace("'", '', trim($enumValue));
					}

					self::$tplVars['item'][$field]['properties']['enums'] = $enums;
				}
			}

			self::$tplVars['singular_table_name'] = str_replace('_', ' ', preg_replace(array('/ies$/', '/s$/'), array('y', ''), preg_replace('/^' . CURRENT_LANG . '_/', '', Router::$params['table_name'])));
		}
	}
?>
