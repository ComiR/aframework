<?php
	class aForum_RecentForumThreadsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['threads'] = array(
				array(
					'title'		=> 'How to bla bla', 
					'author'	=> 'powerbuoy', 
					'content'	=> 'Lorem ipsum dolor sit amet consequeteur lipsumus dolorimus sipsum'
				), 
				array(
					'title'		=> 'How to bla bla', 
					'author'	=> 'powerbuoy', 
					'content'	=> 'Lorem ipsum dolor sit amet consequeteur lipsumus dolorimus sipsum'
				), 
				array(
					'title'		=> 'How to bla bla', 
					'author'	=> 'powerbuoy', 
					'content'	=> 'Lorem ipsum dolor sit amet consequeteur lipsumus dolorimus sipsum'
				), 
				array(
					'title'		=> 'How to bla bla', 
					'author'	=> 'powerbuoy', 
					'content'	=> 'Lorem ipsum dolor sit amet consequeteur lipsumus dolorimus sipsum'
				), 
				array(
					'title'		=> 'How to bla bla', 
					'author'	=> 'powerbuoy', 
					'content'	=> 'Lorem ipsum dolor sit amet consequeteur lipsumus dolorimus sipsum'
				)
			);
		}
	}
?>
