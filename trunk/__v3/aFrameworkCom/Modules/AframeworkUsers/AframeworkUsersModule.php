<?php
	class aFrameworkCom_AframeworkUsersModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['users'] = self::getUsers();
		}

		private static function getUsers () {
			return array(
				array(
					'url'			=> 'http://ourfuture.eu', 
					'title'			=> 'OurFuture.eu', 
					'thumb'			=> WEBROOT . 'OurFutureEU/Styles/open-ole/thumb.png', 
					'description'	=> 'We needed a multi-lingual, highly accessible website for our transnational project "Our Life as Elderly". aFramework was perfect for our needs.'
				), 
				array(
					'url'			=> 'http://andreaslagerkvist.com', 
					'title'			=> 'AndreasLagerkvist.com', 
					'thumb'			=> WEBROOT . 'AndreasLagerkvist/Styles/darker/thumb.png', 
					'description'	=> 'Using aFramework was an obivous choice for me as I\'m the author of it :P'
				), 
				array(
					'url'			=> 'http://agnesekman.com', 
					'title'			=> 'AgnesEkman.com', 
					'thumb'			=> WEBROOT . 'AgnesEkman/Styles/cyber-a/thumb.png', 
					'description'	=> 'As I also built Agnes\' site going with aFramework felt like the natural thing to do.'
				), 
				array(
					'url'			=> 'http://a-framework.org', 
					'title'			=> 'a-Framework.org', 
					'thumb'			=> WEBROOT . 'aFrameworkCom/Styles/aframework-com/thumb.png', 
					'description'	=> 'How would it look if aFramework\'s official site _**didn\'t**_ run on aFramework? :)'
				)
			);
		}
	}
?>
