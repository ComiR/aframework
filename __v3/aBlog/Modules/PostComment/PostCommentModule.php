<?php
	class aBlog_PostCommentModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['post_comment_submit'])) {
				self::insertComment($_POST);
			}

			# We use the article-module's articles_id but on ajax-requests
			# it won't be set so then we use the $post.articles_id from the form instead
			$articlesID = isset($_POST['articles_id']) ? $_POST['articles_id'] : (isset(aBlog_ArticleModule::$tplVars['article']['articles_id']) ? aBlog_ArticleModule::$tplVars['article']['articles_id'] : false);

			if ($articlesID) {
				self::$tplVars['articles_id'] = aBlog_ArticleModule::$tplVars['article']['articles_id'];
			}
			else {
				self::$tplFile = false;
			}
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