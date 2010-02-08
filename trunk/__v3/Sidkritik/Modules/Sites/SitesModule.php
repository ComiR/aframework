<?php
	class Sidkritik_SitesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (Router::getController() == 'Home') {
				self::$tplVars['title'] = 'The Latest Sites';
				self::$tplVars['sites'] = Sites::get('pub_date', 'DESC', 0, 6);
			}
			else {
				$sort = (isset($_GET['sort']) and in_array($_GET['sort'], array('avg_rating', 'pub_date', 'num_reviews'))) ? $_GET['sort'] : 'pub_date';

				self::$tplVars['title'] = 'All Sites';
				self::$tplVars['sites'] = Sites::get($sort, 'DESC');
			}
		}
	}
?>
