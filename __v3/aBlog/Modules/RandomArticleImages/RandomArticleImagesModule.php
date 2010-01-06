<?php
	class aBlog_RandomArticleImagesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$images			= Articles::getImages();
			$numImages		= Config::get('ablog.num_random_images');
			$numImages		= count($images) > $numImages ? $numImages : count($images);
			$randImageIDs	= array_rand($images, $numImages);
			$randImages		= array();

			foreach ($randImageIDs as $randImageID) {
				$randImages[] = $images[$randImageID];
			}

			self::$tplVars['images'] = $randImages;
		}
	}
?>
