<?php
	/**
	 * Takes a feed-URL, caches its contents and returns array
	 *
	 * @class RSSFeed
	 */
	class RSSFeed {
		private $liveFeedURL;						# URL to live feed (http://.../rss.xml) (users should send this to construct)
		private $cachedFeedURL = false;				# 'URL' to cached feed (cachedfeeds/digg.com-324324.xml)
		private $cachedFeedFileName;				# The file-name version of the feed-url (stripped from colons and such)
		private $cacheDir = 'lib/cachedfeeds/';		# Cache dir... so we only need to change it here
		private $xml;								# The SimpleXmlElement object of the xml-file
		private $cacheTimeout = 3600;				# How long feeds should be cached

		/**
		 * Sets live feed url and file-name, also builds
		 * cache-file (unless existent) and builds xml-element
		 *
		 * @method __construct
		 */
		public function __construct($fURL) {
			$this->liveFeedURL = $fURL;
			$this->cachedFeedFileName = preg_replace('/[^a-zA-Z0-9\.]/', '', $fURL);

			if(!$this->getCachedFeedURL()) {
				$this->createCache();
			}

			$this->buildXMLElement();
		}

		/**
		 * Refreshes feed
		 *
		 * @method refreshFeed
		 */
		public function refreshFeed() {
			$this->createCache();
			$this->buildXMLElement();
		}

		/**
		 * Returns neat array of feed-contents ready for output in HTML-document
		 *
		 * @method asArray
		 * @param {Int} $limit, optional limit of feed-items
		 */
		public function asArray($limit = false, $disableIMGs = true, $hhl = 4) {
			if(!$this->xml) {
				return false;
			}

			$feed			= array();
			$url			= ($this->xml->channel->link[0] == '') ? '#' : $this->xml->channel->link[0];
			$fi				= new Favicon($url);
			$description	= ($this->xml->channel->description[0] == '') ? 'No description' : $this->xml->channel->description[0];

			$feed['feed_url']	= htmlentities($this->liveFeedURL);
			$feed['favicon']	= htmlentities($fi->getFaviconURL());
			$feed['url']		= htmlentities($url);
			$feed['title']		= htmlentities($this->xml->channel->title[0]);
			$feed['description']= $description;
			$feed['items']		= array();

			$j = 0;

			foreach($this->xml->channel->item as $it) {
				$feed['items'][$j]['url']		= htmlentities($it->link[0]);
				$feed['items'][$j]['title']		= htmlentities($it->title[0]);
				$feed['items'][$j]['pub_date']	= ($it->pubDate[0] == '') ? 'Unknown' : $it->pubDate[0];
				$feed['items'][$j]['content']	= setHighestHeadingLevel($it->description[0], $hhl);

				if($disableIMGs) {
					$find = '/<img(.*?)>|<object(.*?)>|<embed(.*?)>|<\/object>|<\/embed>/i';
					$feed['items'][$j]['content'] = preg_replace($find, '', $feed['items'][$j]['content']);
				}

				if($limit and ++$j == $limit) {
					break;
				}
			}

			return $feed;
		}

		/**
		 * Checks if there's a local copy of our feed that is no
		 * older than cacheTimeout, deletes older ones it encounters
		 *
		 * @method getCachedFeedURL
		 */
		private function getCachedFeedURL() {
			$dh = opendir($this->cacheDir);

			while($f = readdir($dh)) {
				if('xml' == end(explode('.', $f))) {
					$matches = array();

					if(preg_match('/(' .$this->cachedFeedFileName .')-([0-9]*?).xml/', $f, $matches)) {
						if(time() - $matches[2] < $this->cacheTimeout) {
							$this->cachedFeedURL = $this->cacheDir .$f;

							return true;
						}
						else {
							unlink($this->cacheDir .$f);
						}
					}
				}
			}

			return false;
		}

		/**
		 * Creates a local copy of live-feed and deletes old one if it exists
		 *
		 * @method getCachedFeedURL
		 */
		private function createCache() {
			if(($res = @file_get_contents($this->liveFeedURL))) {
				if($this->cachedFeedURL and file_exists($this->cachedFeedURL)) {
					unlink($this->cachedFeedURL);
				}

				$this->cachedFeedURL = $this->cacheDir .$this->cachedFeedFileName .'-' .time() .'.xml';

				file_put_contents($this->cachedFeedURL, $res);

				return true;
			}

			return false;
		}

		/**
		 * Builds the private SimpleXMLElement ($xml) - version of the rss-feed
		 *
		 * @method buildXMLElement
		 */
		private function buildXMLElement() {
			if(($res = @file_get_contents($this->cachedFeedURL)) and ($xml = new SimpleXmlElement($res))) {
				$this->xml = $xml;

				return true;
			}

			return false;
		}
	}
?>