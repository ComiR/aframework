<?php
	class aCMS_QuickAboutModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['quick_about_update'])) {
				if (!($page = Pages::getPageByURLStr('__quickabout'))) {
					Pages::insert(array(
							'url_str'			=> '__quickabout', 
							'pub_date'			=> date('Y-m-d H:i:s'), 
							'in_navigation'		=> 0, 
							'priority'			=> 0, 
							'priority'			=> 0, 
							'title'				=> 'Quick About', 
							'content'			=> $_POST['content']
						)
					);

					if (!XHR) {
						redirect('?inserted_quick_about');
					}
				}
				else {
					Pages::update($page['pages_id'], array('content' => $_POST['content']));
				}
			}

			if (!($page = Pages::getPageByURLStr('__quickabout'))) {
				self::$tplVars['content'] = Lang::get("# About us\n\nNothing here yet.");
			}
			else {
				self::$tplVars['content'] = $page['content'];
			}
		}
	}
?>
