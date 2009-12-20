<?php
	class aFramework_SearchResultsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['q'])) {
				$start = (isset($_GET['start']) and is_numeric($_GET['start']) and $_GET['start'] > 0) ? $_GET['start'] : 0;

				if (!(self::$tplVars = self::getSearchResults($_GET['q'], $start))) {
					self::$tplFile = 'NoResults';
				}
				else {
					self::$tplVars['start']	= $start + 1;
				}
			}
			else {
				self::$tplFile = 'NoQuery';
			}
		}

		private static function getSearchResults ($q, $start = 0) {
			$return = array();
			$lang	= CURRENT_LANG == Config::get('general.default_lang') ? '' : CURRENT_LANG . '/';
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
