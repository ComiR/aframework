<?php
	class aForum_ForumInfoModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['num_forums']	= 5;
			self::$tplVars['num_threads']	= 78;
			self::$tplVars['num_replies']	= 392;
		}
	}
?>
