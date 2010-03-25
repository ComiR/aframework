<?php
	class aFramework_PaginationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# Make sure some items are set from another module
			if (!isset(self::$tplVars['num_items'])) {
				return self::$tplFile = false;
			}

			# Vars we need
			$url				= (isset(self::$tplVars['url'])) ? self::$tplVars['url'] : '?page=%s';
			$numItems			= self::$tplVars['num_items'];
			$page				= (isset(self::$tplVars['page']) and is_numeric(self::$tplVars['page']) and self::$tplVars['page'] > 0) ? self::$tplVars['page'] : 1;
			$limit				= (isset(self::$tplVars['limit']) and is_numeric(self::$tplVars['limit'])) ? self::$tplVars['limit'] : 10;
			$numPages			= ceil($numItems / $limit);
			$numPagesPerGroup	= 3;
			$nextToSelected		= ceil(($numPagesPerGroup - 1) / 2);
			$pages				= array();

			# Build pages array
			#	< Previous    1 2 3 ... 9 [10] 11 ... 23 24 25     Next >
			#	< Previous    1 [2] 3 ... 23 24 25     Next >
			#	< Previous    1 2 [3] 4 ... 23 24 25     Next >

			# Previous page
			if ($page > 1) {
				self::$tplVars['previous_page'] = array(
					'url'	=> sprintf($url, $page - 1)
				);
			}

			# Next page
			if ($page < $numPages) {
				self::$tplVars['next_page'] = array(
					'url'	=> sprintf($url, $page + 1)
				);
			}

			# Pages in between
			for ($i = 0; $i < $numPages; $i++) {
				$addPage = true;
				$newPage = array(
					'num'	=> $i + 1
				);

				# Selected/current page
				if ($page == $newPage['num']) {
					$newPage['selected'] = true;
				}
				# Always show first X pages
				elseif ($newPage['num'] <= $numPagesPerGroup) {
					$newPage['url'] = sprintf($url, $newPage['num']);
				}
				# And last X pages
				elseif ($newPage['num'] > ($numPages - $numPagesPerGroup)) {
					$newPage['url'] = sprintf($url, $newPage['num']);
				}
				# And pages around the selected one
				elseif ($newPage['num'] >= ($page - $nextToSelected) and $newPage['num'] <= ($page + $nextToSelected)) {
					$newPage['url'] = sprintf($url, $newPage['num']);
				}
				# If previous page was "...", don't show this page
				elseif (!isset($pages[$i - 1]['selected']) and !isset($pages[$i - 1]['url'])) {
					$newPage['hidden'] = true;
				}
				# No URL, no selected and previous page was not the same, add this page as a "..."

				$pages[] = $newPage;
			}

			# If there's only one page, don't show the template
			if (count($pages) < 2) {
				self::$tplFile = false;
			}
			else {
				self::$tplVars['pages']	= $pages;
			}
		}
	}
?>
