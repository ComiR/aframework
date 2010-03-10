<?php
	class aCMS_QuickAboutModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['quick_about_update']) and ADMIN) {
				self::updateOrInsertQuickAbout();
			}

			if (!($page = Pages::getPageByURLStr('__quickabout'))) {
				self::$tplVars['content'] = Lang::get("# About us\n\nNothing here yet.");
			}
			else {
				self::$tplVars['content'] = $page['content'];
			}
		}

		private static function updateOrInsertQuickAbout () {
			if (!($page = Pages::getPageByURLStr('__quickabout'))) {
				Pages::insert(array(
						'url_str'			=> '__quickabout', 
						'in_navigation'		=> 0, 
						'priority'			=> 0, 
						'title'				=> 'Quick About', 
						'content'			=> $_POST['content']
					)
				);

				if (!XHR) {
					redirect(msg('Inserted Quick About', 'The quick about was successfully inserted.'));
				}
			}
			else {
				Pages::update($page['pages_id'], array('content' => $_POST['content']));

				if (!XHR) {
					redirect(msg('Updated Quick About', 'The quick about was successfully updated.'));
				}
			}
		}
	}
?>
