<?php	
	class aFramework_SearchResultsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(isset($_GET['q'])) {
				self::$tplVars = self::getSearchResults($_GET['q'], isset($_GET['start']) ? $_GET['start'] : 0);

				if(!isset(self::$tplVars)) {
					self::$tplFile = 'NoResults';
				}
			}
		}

		private static function getSearchResults($q, $start = 0) {
			$return = array();
			$url	= 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' .urlencode($q) .'%20site:exscale.se&rsz=large&start=' .$start;
			$ch		= curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_REFERER, 'http://www.exscale.se');

			$body	= curl_exec($ch);

			curl_close($ch);

			$body	= json_decode($body);
			$i		= 0;

			foreach($body->responseData->results as $r) {
				$return['results'][$i]['title']		= $r->title;
				$return['results'][$i]['url']		= $r->url;
				$return['results'][$i]['content']	= $r->content;
				$i++;
			}

			if(isset($body->responseData->cursor->pages)) {
				foreach($body->responseData->cursor->pages as $p) {
					 $return['pages'][] = $p->start;
				}
			}

			return count($return) ? $return : false;
		}
	}
?>