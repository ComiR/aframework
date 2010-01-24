<?php
	class CacheManager {
		private static $cacheFile;
		private static $cachePath;

		public static function run () {
			$currentStyle = isset($_COOKIE['style']) ? $_COOKIE['style'] : Config::get('general.default_style');

			self::$cachePath = DOCROOT . 'aFramework/Cache/';
			self::$cacheFile = md5(CURRENT_SITE . $currentStyle . currPageURL());

			# Only check once every 10 minutes
			$cacheTime = 0; # 600

			# If no cache exists we can't do shit so just return
			if (!self::cacheExists()) {
				return false;
			}

			# Get the creation date of the cache (we will compare it to changes on the site)
			$cacheCreated = self::getCacheCreationDate();

			# Only check DB and file-changes if cache was created more than $cacheTime seconds ago
			if ((time() - $cacheCreated) < $cacheTime) {
				return self::readCache();
			}

			# If any DB-table has been changed after cache was generated, return false
			if ($cacheCreated < self::getLatestDBChange()) {
				return false;
			}

			# If any file in the current site's Files/ directory has changed also return false
			if ($cacheCreated < self::getLatestFileChange()) {
				return false;
			}

			# No change has happened in either DB or Files since cache was created
			# so there's no point in reloading the entire page, just return the cache
			$cachedPage = self::readCache();

			# Also create new cache so that we get new $cacheTime (otherwise it will be more than $cacheTime seconds ago the cache was created next run as well, even though we JUST checked the DB and files)
			self::createCache($cachedPage);

			return $cachedPage;
		}

		public static function createCache ($content) {
			file_put_contents(self::$cachePath . self::$cacheFile, $content);
		}

		private static function readCache () {
			return file_get_contents(self::$cachePath . self::$cacheFile);
		}

		private static function cacheExists () {
			return file_exists(self::$cachePath . self::$cacheFile);
		}

		private static function getCacheCreationDate () {
			return filemtime(self::$cachePath . self::$cacheFile);
		}

		private static function getLatestDBChange () {
			$res			= DB::qry('SHOW TABLES');
			$tables			= array();
			$latestChange	= 0;
			$allowedLangs	= explode(',', Config::get('lang.allowed_langs'));

			while ($row = mysql_fetch_assoc($res)) {
				$tables[] = preg_replace('/^(' . implode('|', $allowedLangs) . ')_/', '', end($row));
			}

			$tables = array_unique($tables);

			foreach ($tables as $table) {
				$tsRes = DB::qry("SELECT ts FROM $table ORDER BY ts DESC LIMIT 1");
				$thisTablesLatestChange = 0;

				if (mysql_num_rows($tsRes)) {
					$thisTablesLatestChange = strtotime(mysql_result($tsRes, 0));
				}

				if ($thisTablesLatestChange > $latestChange) {
					$latestChange = $thisTablesLatestChange;
				}
			}

			return $latestChange;
		}

		private static function getLatestFileChange () {
			return self::getDirsLatestChange(CURRENT_SITE_DIR . 'Files');
		}

		private static function getDirsLatestChange ($path) {
			$lastChange	= 0;

			if (is_dir($path)) {
				$dh = opendir($path);

				while ($f = readdir($dh)) {
					if (!in_array($f, array('..', '.'))) {
						if (is_dir($path . $f)) {
							$thisDirsLastChange = self::getDirsLatestChange("$path/$f");

							if ($thisDirsLastChange > $lastChange) {
								$lastChange = $thisDirsLastChange;
							}
						}
						else {
							$thisFilesLastChange = filemtime("$path/$f");

							if ($thisFilesLastChange > $lastChange) {
								$lastChange = $thisFilesLastChange;
							}
						}
					}
				}
			}

			return $lastChange;
		}

		private static function test () {
			$now	= microtime(true) * 1000;
			$i		= 0;

			while ((microtime(true) * 1000 - $now) < 1000) {
				CacheManager::run();
				$i++;
			}

			echo $i;
			die;
		}
	}
?>
