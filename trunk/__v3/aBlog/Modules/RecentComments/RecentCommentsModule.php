<?php
	class aBlog_RecentCommentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if (isset($_POST['recent_comments_delete']) and ADMIN) {
				self::deleteComment($_POST['comments_id']);
			}

			self::showTheComments();
		}

		private static function showTheComments () {
			$start = (isset($_GET['recent_comments_start']) and is_numeric($_GET['recent_comments_start']) and $_GET['recent_comments_start'] > 0) ? $_GET['recent_comments_start'] : 0;

			if (!(self::$tplVars['comments'] = Comments::get('pub_date', 'DESC', $start, Config::get('ablog.num_recent_stuff')))) {
				self::$tplFile = false;
			}
			else {
				self::$tplVars['start']	= $start + 1;
				self::$tplVars['prev']	= $start === 0 ? false : $start - Config::get('ablog.num_recent_stuff');
				self::$tplVars['next']	= $start + Config::get('ablog.num_recent_stuff');
			}
		}

		private static function deleteComment ($id) {
			Comments::delete($id);

			if (!XHR) {
				redirect('?deleted_comment');
			}
		}
	}
?>