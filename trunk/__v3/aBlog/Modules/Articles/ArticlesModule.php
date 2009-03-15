<?php
	class aBlog_ArticlesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['url_str'])) {
				self::showArticlesByURLStr($_GET['url_str']);
			}
			elseif (isset($_GET['year'])) {
				$date = $_GET['year'];

				if (isset($_GET['month'])) {
					$date .= $_GET['month'];
				}

				if (isset($_GET['day'])) {
					$date .= $_GET['day'];
				}

				self::showArticlesByDate($date);
			}
			else {
				self::showLatestArticles();
			}
		}

		private static function showArticlesByURLStr ($urlStr) {
			self::$tplVars['title']			= Lang::get('articles_tagged_with') . ' "' . $urlStr . '"';
			self::$tplVars['description']	= '';
			self::$tplVars['articles']		= Articles::getArticlesByTagURLStr($urlStr);

			if (!self::$tplVars['articles']) {
				FourOFour::run();
			}
		}

		private static function showArticlesByDate ($urlStr) {
			self::$tplVars['title']			= Lang::get('articles_tagged_with') . ' "' . $urlStr . '"';
			self::$tplVars['description']	= '';
			self::$tplVars['articles']		= Articles::getArticlesByTagURLStr($urlStr);

			if (!self::$tplVars['articles']) {
				FourOFour::run();
			}
		}

		private static function showLatestArticles () {
			self::$tplVars['title']			= Lang::get('articles_tagged_with') . ' "' . $urlStr . '"';
			self::$tplVars['description']	= '';
			self::$tplVars['articles']		= Articles::getArticlesByTagURLStr($urlStr);

			if (!self::$tplVars['articles']) {
				FourOFour::run();
			}
		}
	}
?>