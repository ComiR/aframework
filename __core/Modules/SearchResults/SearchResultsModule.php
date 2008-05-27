<?php
	class SearchResultsModule {
		public function run() {
			global $_TPLVARS;

			if(isset($_GET['q'])) {
				$start	= isset($_GET['start']) ? $_GET['start'] : 0;
				$url	= 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' .urlencode($_GET['q']) .'%20site:exscale.se&rsz=large&start=' .$start;
				$ch		= curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_REFERER, 'http://www.exscale.se');
				$body	= curl_exec($ch);
				curl_close($ch);
				$body	= json_decode($body);
				$i		= 0;
				foreach($body->responseData->results as $r) {
					$_TPLVARS['search_results']['results'][$i]['title']		= $r->title;
					$_TPLVARS['search_results']['results'][$i]['url']		= $r->url;
					$_TPLVARS['search_results']['results'][$i]['content']	= $r->content;
					$i++;
				}
				if(isset($body->responseData->cursor->pages)) {
					foreach($body->responseData->cursor->pages as $p) {
						$_TPLVARS['search_results']['pages'][] = $p->start;
					}
				}
				if(!isset($_TPLVARS['search_results'])) {
					$_TPLVARS['SearchResultsTplFile'] = 'NoResults';
				}
			}
		}
	}
?>