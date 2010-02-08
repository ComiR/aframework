<?php
	class aCMS_IntroTextModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['intro_text_submit']) and ADMIN) {
				self::updateOrInsertIntroText();
			}

			if (!(self::$tplVars['page'] = Pages::getPageByURLStr('__' . md5($_SERVER['PATH_INFO'])))) {
				if (!ADMIN) {
					self::$tplFile = false;
				}
			}
		}

		private static function updateOrInsertIntroText () {
			$url = '__' . md5($_SERVER['PATH_INFO']);

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
					redirect('?inserted_intro_text');
				}
			}
			else {
				Pages::update($page['pages_id'], array('content' => $_POST['content']));

				if (!XHR) {
					redirect('?updated_intro_text');
				}
			}
		}
	}
?>
