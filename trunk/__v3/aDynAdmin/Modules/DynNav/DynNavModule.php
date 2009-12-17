<?php
	class aDynAdmin_DynNavModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!ADMIN) {
				FourOFour::run();
			}

			if (!isset(Router::$params['table_name'])) {
				return self::$tplFile = false;
			}

			self::$tplVars['nav_items'] = array(
				array(
					'title'		=> Lang::get('Browse'), 
					'url'		=> Router::urlFor('DynItems', array('table_name' => Router::$params['table_name'])), 
					'selected'	=> (Router::getController() == 'DynItems') ? true : false
				), 
				array(
					'title'		=> Lang::get('Add'), 
					'url'		=> Router::urlFor('AddDynItem', array('table_name' => Router::$params['table_name'])), 
					'selected'	=> (Router::getController() == 'AddDynItem') ? true : false
				)
			);

			if (isset(Router::$params['item_id'])) {
				self::$tplVars['nav_items'][] = array(
					'title'		=> Lang::get('Edit'), 
					'url'		=> Router::urlFor('DynItem', array('table_name' => Router::$params['table_name'], 'item_id' => Router::$params['item_id'])), 
					'selected'	=> true
				);
			}
		}
	}
?>
