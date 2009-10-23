<?php
	class aForum_LatestThreadsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['threads'] = array(
				array(
					'title'	=> 'How to bla bla'
				), 
				array(
					'title'	=> 'How to bla bla'
				), 
				array(
					'title'	=> 'How to bla bla'
				), 
				array(
					'title'	=> 'How to bla bla'
				), 
				array(
					'title'	=> 'How to bla bla'
				)
			);
		}
	}
?>
