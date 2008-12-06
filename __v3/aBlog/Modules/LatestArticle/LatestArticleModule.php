<?php
	class aBlog_LatestArticleModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(isset($_POST['latest_article_submit']) and ADMIN) {
				self::insertArticle($_POST);
			}

			if(!(self::$tplVars = Articles::get('pub_date', 'DESC', 0, 1))) {
				self::$tplFile = 'NoArticles';
			}
		}

		private static function insertArticle($row) {
			# Make sure mandatory fields are filled out
			if(
				isset($row['title']) and !empty($row['title']) and 
				isset($row['content']) and !empty($row['content']) and 
				isset($row['url_str']) and !empty($row['url_str'])
			) {
				Articles::insert($row);

				if(!XHR) {
					redirect(Router::urlFor('Article', $row) .'?inserted_page');
				}
			}
			# Errors in form
			else {
				self::$tplVars['errors'] = true;
			}
		}
	}
?>