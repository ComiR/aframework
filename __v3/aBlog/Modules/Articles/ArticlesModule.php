<?php
	class aBlog_ArticlesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['url_str'])) {
				self::showArticlesByTagURLStr($_GET['url_str']);
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

			aFramework_BaseModule::$tplVars['html_title']	= self::$tplVars['title'];
		}

		private static function showArticlesByTagURLStr ($urlStr) {
			if (!(self::$tplVars['articles'] = Articles::getArticlesByTagURLStr($urlStr))) {
				FourOFour::run();
			}
			else {
				self::$tplVars['title']			= Lang::get('articles_tagged_with') . ' "' . $urlStr . '"';
				self::$tplVars['description']	= Lang::get('you_are_currently_browsing') . ' ' . count(self::$tplVars['articles']) . ' ' . Lang::get('articles_tagged_with') . ' "' . $urlStr . '"';
			}
		}

		private static function showArticlesByDate ($pubDate) {
			if (!(self::$tplVars['articles'] = Articles::getArticlesByPubDate($pubDate))) {
				FourOFour::run();
			}
			else {
				$inon = (strlen($pubDate) == 8) ? 'on' : 'in';

				self::$tplVars['title']			= Lang::get('archives_for') . ' ' . self::$tplVars['articles'][0]['show_date'];
				self::$tplVars['description']	= Lang::get('you_are_currently_browsing') . ' ' . count(self::$tplVars['articles']) . ' ' . Lang::get('articles_posted_' . $inon) . ' ' . self::$tplVars['articles'][0]['show_date'];
			}
		}

		private static function showLatestArticles () {
			if (!(self::$tplVars['articles'] = Articles::get('pub_date', 'DESC', 0, Config::get('ablog.num_recent_articles')))) {
				FourOFour::run();
			}
			else {
				self::$tplVars['title']			= Lang::get('the_latest_articles');
				self::$tplVars['description']	= '';
			}
		}
	}
?>