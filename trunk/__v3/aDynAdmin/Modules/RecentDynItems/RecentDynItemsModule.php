<?php
	class aDynAdmin_RecentDynItemsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!ADMIN) {
				FourOFour::run();
			}

			self::$tplVars['recent_items'] = array(
				array(
					'table'		=> array(
						'name'	=> 'comments', 
						'title'	=> 'Comments'
					), 
					'num_items'	=> 3
				), 
				array(
					'table'		=> array(
						'name'	=> 'forum_replies', 
						'title'	=> 'Forum Replies'
					), 
					'num_items'	=> 25
				)
			);
		}
	}
?>
