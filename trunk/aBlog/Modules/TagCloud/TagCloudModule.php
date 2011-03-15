<?php
	class aBlog_TagCloudModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['tags'] = Tags::get('title', 'ASC'))) {
				self::$tplFile = false;
			}
		}
	}
?>