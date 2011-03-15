<?php
	class aFramework_SearchResultsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['q'])) {
				$page	= (isset($_GET['page']) and is_numeric($_GET['page']) and $_GET['page'] > 0) ? $_GET['page'] : 1;
				$limit	= 8;
				$start	= ($page - 1) * $limit;

				if (!(self::$tplVars = self::getSearchResults($_GET['q'], $start))) {
					self::$tplFile = 'NoResults';
				}
				else {
					self::$tplVars['start']	= $start + 1;

					# Set up Pagination
					aFramework_PaginationModule::$tplVars['page']		= $page;
					aFramework_PaginationModule::$tplVars['limit']		= $limit;
					aFramework_PaginationModule::$tplVars['num_items']	= self::$tplVars['total_num_results'];
					aFramework_PaginationModule::$tplVars['url']		= Router::urlFor('SearchResults') . '?q=' . urlencode($_GET['q']) . '&amp;page=%s';
				}
			}
			else {
				self::$tplFile = 'NoQuery';
			}
		}

		private static function getSearchResults ($q, $start = 0) {
			$return = array();
		#	$lang	= CURRENT_LANG == Config::get('lang.default_lang') ? '' : CURRENT_LANG . '/'; # needs USE_MOD_REWRITE-fix but it's better to search on the whole site anyway
			$lang	= '';
			$site	= $_SERVER['SERVER_NAME'] . WEBROOT . $lang;
			$url	= 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' . urlencode($q) . '%20site:' . $site . '&rsz=large&start=' . $start;
			$ch		= curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_REFERER, 'http://' . $site);

			$body	= curl_exec($ch);

			curl_close($ch);

			$body	= json_decode($body);

			if (isset($body->responseData->results)) {
				foreach ($body->responseData->results as $r) {
					$return['results'][] = array(
						'title'		=> preg_replace('/ - ' . Config::get('general.site_title') . '$/', '', str_replace(array('b>'), array('strong>'), $r->titleNoFormatting)), 
						'url'		=> $r->url, 
						'content'	=> str_replace(array('<b>...</b>', '<b>....</b>', 'b>'), array('...', '...', 'strong>'), $r->content)
					);
				}
			}

			if (isset($body->responseData->cursor->pages)) {
				foreach ($body->responseData->cursor->pages as $p) {
					 $return['pages'][] = $p->start;
				}
			}

			if (isset($return['results'])) {
				 $return['num_results']			= count($return['results']);
				 $return['total_num_results']	= $body->responseData->cursor->estimatedResultCount;
			}

			return isset($return['results']) ? $return : false;
		}
	}
?>
