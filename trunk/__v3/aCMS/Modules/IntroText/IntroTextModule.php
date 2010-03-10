<?php
	class aCMS_IntroTextModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['intro_text_submit']) and ADMIN) {
				self::updateOrInsertIntroText();
			}

			$pathInfo = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';

			if (!(self::$tplVars['page'] = Pages::getPageByURLStr('__' . md5($pathInfo)))) {
				if (!ADMIN) {
					self::$tplFile = false;
				}
			}
		}

		private static function updateOrInsertIntroText () {
			$pathInfo = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';
			$url = '__' . md5($pathInfo);

			if (!($page = Pages::getPageByURLStr($url))) {
				Pages::insert(array(
						'url_str'			=> $url, 
						'in_navigation'		=> 0, 
						'priority'			=> 0, 
						'title'				=> 'IntroText', 
						'content'			=> $_POST['content']
					)
				);

				if (!XHR) {
					redirect(msg('Inserted Intro Text', 'The intro text was successfully inserted.'));
				}
			}
			else {
				Pages::update($page['pages_id'], array('content' => $_POST['content']));

				if (!XHR) {
					redirect(msg('Updated Intro Text', 'The intro text was successfully updated.'));
				}
			}
		}
	}
?>
