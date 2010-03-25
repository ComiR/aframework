<?php
	class aBlog_RecentCommentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			$numComments = Config::get('ablog.num_recent_comments');

			$start = (isset($_GET['recent_comments_start']) and is_numeric($_GET['recent_comments_start']) and $_GET['recent_comments_start'] > 0) ? $_GET['recent_comments_start'] : 0;

			if (!(self::$tplVars['comments'] = Comments::get('pub_date', 'DESC', $start, $numComments, ADMIN))) {
				self::$tplFile = false;
			}
			else {
				self::$tplVars['start']	= $start + 1;
				self::$tplVars['prev']	= $start === 0 ? false : $start - $numComments;
				self::$tplVars['next']	= $start + $numComments;
			}
		}
	}
?>
