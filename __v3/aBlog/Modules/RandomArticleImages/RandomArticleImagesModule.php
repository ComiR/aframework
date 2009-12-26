<?php
	class aBlog_RandomArticleImagesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$images			= Articles::getImages();
			$numImages		= count($images) > 9 ? 0 : count($images);
			$randImageIDs	= array_rand($images, $numImages);
			$randImages		= array();

			foreach ($randImageIDs as $randImageID) {
				$randImages[] = $images[$randImageID];
			}

			self::$tplVars['images'] = $randImages;
		}
	}
?>
