<?php
	class FourOFour {
		public static function run () {
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

			if ($referrer) {
				$referrerSite = explode('/', $referrer);
				$referrerSite = $referrerSite[2];
			}

			# For the search-results-module
			$pathInfo	= isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
			$searchTerm	= str_replace('/' . CURRENT_LANG . '/', '', $pathInfo);
			$searchTerm	= str_replace(array(WEBROOT, 'index.php', '/', '-'), ' ', $searchTerm);
			$searchTerm	= urldecode(trim($searchTerm));
			$_GET['q']	= $searchTerm;

			include DOCROOT .'aFramework/Files/404-stuff/head.php';

			if (!$referrer) {
				include DOCROOT . 'aFramework/Files/404-stuff/no-referrer.php';
			}
			elseif ($internalRef) {
				include DOCROOT . 'aFramework/Files/404-stuff/internal-referrer.php';
			}
			elseif ($searchRef) {
				$qryStrings = array(
					'q', 
					'p', 
					'ask', 
					'key'
				);
				$params = explode('?', $referrer);
				$params = explode('&', $params[1]);

				foreach ($params as $p) {
					$ps = explode('=', $p);

					if (in_array($ps[0], $qryStrings)) {
						$_GET['q'] = str_replace('+', ' ', $ps[1]);
					}
				}

				include DOCROOT . 'aFramework/Files/404-stuff/search-referrer.php';
			}
			else {
				include DOCROOT . 'aFramework/Files/404-stuff/other-referrer.php';
			}

			aFramework::runModule('SearchResults');

			echo str_replace('</h2>', ' on ' . Config::get('general.site_title') .'</h2>', aFramework::fetchModule('SearchResults'));

			$foot = fetch(DOCROOT . 'aFramework/Files/404-stuff/foot.php');

			if (SU) {
				$foot = str_replace('{DEBUG}', '<div id="debug">' . fetch(DOCROOT . 'aFramework/Modules/Debug/Debug.tpl.php') . '</div>', $foot);
			}

			echo $foot;

			die;
		}
	}
?>
