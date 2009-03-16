<?php
	class aBlog_PostCommentModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['post_comment_submit'])) {
				self::insertComment($_POST);
			}

			if (!isset(aBlog_ArticleModule::$tplVars['article']['articles_id'])) {
				return self::$tplFile = false;
			}

			self::$tplVars['articles_id'] = aBlog_ArticleModule::$tplVars['article']['articles_id'];
		}

		private static function insertComment ($row) {
			if (
				isset($row['author']) and !empty($row['author']) and 
				isset($row['content']) and !empty($row['content'])
			) {
				Comments::insert($row);

				if (!XHR) {
					redirect('?added_comment');
				}
			}
			else {
				self::$tplVars['errors'] = true;
			}
		}
	}
?>