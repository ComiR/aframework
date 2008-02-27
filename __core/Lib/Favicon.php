<?php
	/**
	 * Takes a URL and returns that sites favicon's URL (if any)
	 *
	 * @class Favicon
	 */
	class Favicon {
		private $url;
		private $cachedURLs = array();
		private $cachedURLsFile = 'lib/cachedurls';
		private $defaultFaviconFile = 'lib/favicon.png';

		public function __construct($url) {
			$this->loadCachedURLs();

			$this->url = $url;
		}

		public function getFaviconURL() {
			if(strlen($this->url) < 5) { // can't be real url
				return $this->defaultFaviconFile;
			}

			$this->_getFaviconURL();

			return $this->cachedURLs["$this->url"]; // weird, "" are needed else "index does not exist" (same below)
		}

		private function _getFaviconURL() {
			// Don't fetch it again if already cached
			if(isset($this->cachedURLs["$this->url"])) {
				return;
			}

			// See if favicon.ico exists in root of target site
			if(@file_get_contents($this->url .'/favicon.ico')) {
				$favicon = $this->url .'/favicon.ico';
			}
			// If not, search for first occurence of *.ico in site source
			else {
				$str = @file_get_contents($this->url);
				$find = '/[^"]*\.ico/i';
				$matches = array();

				if(preg_match($find, $str, $matches)) {
					$favicon = (stristr($matches[0], 'http://')) ? $matches[0] : $this->url .$matches[0]; // Possibly takes care of relative paths
				}
				else {
					$favicon = $this->defaultFaviconFile;
				}
			}

			// Make sure there are no double slashes (except the first two)
			$favicon = str_replace('http:/', 'http://', preg_replace('/\/+/', '/', $favicon));

			$this->cachedURLs["$this->url"] = $favicon;
			$this->saveCachedURLs();
		}

		private function loadCachedURLs() {
			if(!file_exists($this->cachedURLsFile)) {
				file_put_contents($this->cachedURLsFile, serialize(array()));
			}

			$this->cachedURLs = unserialize(stripslashes(file_get_contents($this->cachedURLsFile)));
		}

		private function saveCachedURLs() {
			file_put_contents($this->cachedURLsFile, serialize($this->cachedURLs));
		}
	}
?>