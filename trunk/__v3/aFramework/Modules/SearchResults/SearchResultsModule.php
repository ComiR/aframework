<?php	
	class aFramework_SearchResultsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(isset($_GET['q'])) {
				self::$tplVars = self::getSearchResults($_GET['q'], isset($_GET['start']) ? $_GET['start'] : 0);

				if(self::$tplVars == false) {
					self::$tplFile = 'NoResults';
				}
			}
			else {
				self::$tplFile = false;
			}
		}

		private static function getSearchResults($q, $start = 0) {
		/*	return array(
				'results' => array(
					array(
						'title' => 'Lorem ipsum', 
						'url' => '/lorem/', 
						'content' => 'Lorem ipsum dolor sit amet. Consequeteur lipsimus dolor.'
					), 
					array(
						'title' => 'Ipsum dolor', 
						'url' => '/ipsum/', 
						'content' => 'Ipsum lorum sit dolor amet. Consequeteur dolor lisams.'
					)
				)
			);
		*/
			$return = array();
			$site	= 'http://exscale.se'; # $_SERVER['SERVER_NAME'];
			$url	= 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' .urlencode($q) .'%20site:' .$site .'&rsz=large&start=' .$start;
			$ch		= curl_init();

			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_REFERER, 'http://' .'http://exscale.se'); # $_SERVER['SERVER_NAME']);

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