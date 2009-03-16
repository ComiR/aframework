<?php
	class aFramework_SocialBookmarksModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$pageTitle	= isset(aFramework_BaseModule::$tplVars['html_title']) ? aFramework_BaseModule::$tplVars['html_title'] : Config::get('general.site_title');
			$pageTitle	= urlencode($pageTitle);
			$pageURL	= currPageURL();

			self::$tplVars['sites'] = array(
				array(
					'url' => "http://del.icio.us/post?title=$pageTitle&amp;url=$pageURL", 
					'title' => 'del.icio.us'
				), 
				array(
					'url' => "http://digg.com/submit?phase=2&amp;title=$pageTitle&amp;url=$pageURL", 
					'title' => 'Digg'
				), 
				array(
					'url' => "http://www.furl.net/storeIt.jsp?t=$pageTitle&amp;u=$pageURL", 
					'title' => 'Furl'
				), 
				array(
					'url' => "http://www.google.com/bookmarks/mark?op=add&amp;title=$pageTitle&amp;bkmk=$pageURL", 
					'title' => 'Google'
				), 
				array(
					'url' => "http://www.technorati.com/faves?add=$pageURL", 
					'title' => 'Technorati'
				), 
				array(
					'url' => "http://ma.gnolia.com/beta/bookmarklet/add?title=$pageTitle&amp;description=&amp;url=$pageURL", 
					'title' => 'Ma.gnolia'
				), 
				array(
					'url' => "http://www.blinklist.com/index.php?Action=Blink/addblink.php&amp;Title=$pageTitle&amp;Description=&amp;Url=$pageURL", 
					'title' => 'Blinklist'
				), 
				array(
					'url' => "http://blogmarks.net/my/new.php?mini=1&amp;simple=1&amp;title=$pageTitle&amp;url=$pageURL", 
					'title' => 'Blogmarks'
				), 
				array(
					'url' => "http://www.rojo.com/submit/?title=$pageTitle&amp;url=$pageURL", 
					'title' => 'Rojo'
				), 
				array(
					'url' => "http://www.stumbleupon.com/submit?title=$pageTitle&amp;url=$pageURL", 
					'title' => 'Stumbleupon'
				)
			);
		}
	}
?>