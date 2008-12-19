<?php
	class aBlog_RecentCommentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(!(self::$tplVars['comments'] = Comments::get('pub_date', 'DESC', 0, Config::get('ablog.num_recent_stuff')))) {
				self::$tplFile = false;
			}
			else {
				self::$tplVars['start'] = (isset($_GET['recent_comments_start']) and is_numeric($_GET['recent_comments_start'])) ? $_GET['recent_comments_start'] : 1;
				self::$tplVars['prev'] = false;
				self::$tplVars['next'] = false;
			}
		}
	}
?>