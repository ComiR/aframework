<?php
	class aBlog_ArticlesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset(Router::$params['url_str'])) {
				self::showArticlesByTagURLStr(Router::$params['url_str']);
			}
			elseif (isset(Router::$params['year'])) {
				$date = Router::$params['year'];

				if (isset(Router::$params['month'])) {
					$date .= Router::$params['month'];
				}

				if (isset(Router::$params['day'])) {
					$date .= Router::$params['day'];
				}

				self::showArticlesByDate($date);
			}
			else {
				self::showLatestArticles();
			}

			if (!isset(self::$tplVars['title'])) {
				return self::$tplFile = false;
			}

			aFramework_BaseModule::$tplVars['html_title'] = self::$tplVars['title'];

			if (isset($_GET['rss'])) {
				header("Content-type: application/rss+xml");

				self::$tplFile = 'RSS';
			}
		}

		private static function showArticlesByTagURLStr ($urlStr) {
			if (!(self::$tplVars['articles'] = Articles::getArticlesByTagURLStr($urlStr))) {
				FourOFour::run();
			}
			else {
				self::$tplVars['title']			= Lang::get('Articles Tagged with') . ' "' . $urlStr . '"';
				self::$tplVars['description']	= Lang::get('You are currently browsing') . ' ' . count(self::$tplVars['articles']) . ' ' . Lang::get('articles tagged with') . ' "' . $urlStr . '".';
			}
		}

		private static function showArticlesByDate ($pubDate) {
			if (!(self::$tplVars['articles'] = Articles::getArticlesByPubDate($pubDate))) {
				FourOFour::run();
			}
			else {
				$inon = (strlen($pubDate) == 8) ? 'on' : 'in';

				self::$tplVars['title']			= Lang::get('Archives for') . ' ' . self::$tplVars['articles'][0]['show_date'];
				self::$tplVars['description']	= Lang::get('You are currently browsing') . ' ' . count(self::$tplVars['articles']) . ' ' . Lang::get('articles posted ' . $inon) . ' ' . self::$tplVars['articles'][0]['show_date'] . '.';
			}
		}

		private static function showLatestArticles () {
			if (!($articles = Articles::get('pub_date', 'DESC'))) {
				return false;
			}
			else {
				$page	= (isset($_GET['page']) and is_numeric($_GET['page']) and $_GET['page'] > 0) ? $_GET['page'] : 1;
				$limit	= Config::get('ablog.num_recent_articles');
				$start	= ($page - 1) * $limit;

				aFramework_PaginationModule::$tplVars['num_items']	= count($articles);
				aFramework_PaginationModule::$tplVars['page']		= $page;
				aFramework_PaginationModule::$tplVars['limit']		= $limit;

				self::$tplVars['articles']		= array_splice($articles, $start, $limit);
				self::$tplVars['title']			= Lang::get('The Latest Articles');
				self::$tplVars['description']	= '';
			}
		}
	}
?>
