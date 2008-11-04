<?php
	class FourOFour {
		public static function run() {
			header('HTTP/1.1 404 Not Found');

			$referrer		= isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : false;
			$referrerSite	= false;
			$internalRef	= stristr($referrer, $_SERVER['SERVER_NAME']);
			$searchRef		= (
				stristr($referrer, 'looksmart.co') or 
				stristr($referrer, 'ifind.freeserve.co') or 
				stristr($referrer, 'ask.co') or 
				stristr($referrer, 'google.') or 
				stristr($referrer, 'altavista.co') or 
				stristr($referrer, 'msn.co') or
				stristr($referrer, 'yahoo.co')
			);

			if($referrer) {
				$referrerSite = explode('/', $referrer);
				$referrerSite = $referrerSite[2];
			}

			# For the search-results-module
			$_GET['q'] = trim(str_replace(array('index.php', '/', '-'), ' ', $_SERVER['REQUEST_URI']));

			include DOCROOT .'aFramework/Files/404-stuff/head.php';

			if(!$referrer) {
				include DOCROOT .'aFramework/Files/404-stuff/no-referrer.php';
			}
			elseif($internalRef) {
				include DOCROOT .'aFramework/Files/404-stuff/internal-referrer.php';
			}
			elseif($searchRef) {
				$qryStrings = array(
					'q', 
					'p', 
					'ask', 
					'key'
				);
				$params = explode('?', $referrer);
				$params = explode('&', $params[1]);

				foreach($params as $p) {
					$ps = explode('=', $p);

					if(in_array($ps[0], $qryStrings)) {
						$_GET['q'] = str_replace('+', ' ', $ps[1]);
					}
				}

				include DOCROOT .'aFramework/Files/404-stuff/search-referrer.php';
			}
			else {
				include DOCROOT .'aFramework/Files/404-stuff/other-referrer.php';
			}

			aFramework::runModule('SearchResults');
			echo str_replace('</h2>', ' on ' .SITE_TITLE .'</h2>', aFramework::fetchModule('SearchResults'));

			include DOCROOT .'aFramework/Files/404-stuff/foot.php';

			die;
		}
	}
?>
