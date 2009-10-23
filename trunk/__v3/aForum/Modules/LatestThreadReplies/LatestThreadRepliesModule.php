<?php
	class aForum_LatestThreadRepliesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['replies'] = array(
				array(
					'title'	=> 'How to bla bla', 
					'thread_replies_id'	=> 1
				), 
				array(
					'title'	=> 'How to bla bla', 
					'thread_replies_id'	=> 2
				), 
				array(
					'title'	=> 'How to bla bla', 
					'thread_replies_id'	=> 3
				), 
				array(
					'title'	=> 'How to bla bla', 
					'thread_replies_id'	=> 4
				), 
				array(
					'title'	=> 'How to bla bla', 
					'thread_replies_id'	=> 5
				)
			);
		}
	}
?>
