<?php
	class aCMS_PageModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['page_delete']) and ADMIN) {
				self::deletePage($_POST['pages_id']);
			}
			elseif (isset($_POST['page_submit']) and ADMIN) {
				self::updatePage($_POST);
			}

			self::showThePage();
		}

		private static function showThePage () {
			# Don't allow "hidden" pages
			if (isset(Router::$params['url_str']) and substr(Router::$params['url_str'], 0, 2) == '__') {
				FourOFour::run();
			}

			# Try to get $get.url_str, else get home-page
			$page = Pages::getPageByURLStr(isset(Router::$params['url_str']) ? Router::$params['url_str'] : '__home');

			# If no url_str is set and we're admin
			if (!isset(Router::$params['url_str']) and Router::getController() == 'AddPage' and ADMIN) {
				aFramework_BaseModule::$tplVars['html_title'] = Lang::get('Add a Page');
			}
			# No page exists
			elseif (!$page) {
				FourOFour::run();
			}
			# We found a page
			else {
				self::$tplVars['page'] = $page;

				if (Router::getController() != 'Home') {
					aFramework_BaseModule::$tplVars['html_title']	= escHTML($page['title']);
				}

				aFramework_BaseModule::$tplVars['meta_description']	= escHTML($page['meta_description']);
				aFramework_BaseModule::$tplVars['meta_keywords']	= escHTML($page['meta_keywords']);

				if (Router::getController() == 'Page') {
					aFramework_BaseModule::$tplVars['body_id'] = $page['url_str'];
				}
			}
		}

		private static function deletePage ($id) {
			Pages::delete($id);

			if (!XHR) {
				redirect(Router::urlFor('AddPage') . '?deleted_page');
			}
		}

		private static function updatePage ($row) {
			$row['url_str']		= empty($row['url_str']) ? $row['title'] : $row['url_str'];
			$row['url_str']		= Router::urlize($row['url_str']);

			# Make sure mandatory fields are filled out
			if (
					isset($row['title']) and !empty($row['title']) and 
					isset($row['content']) and !empty($row['content'])
				) {
				# If a page ID is set, update
				if (!empty($row['pages_id']) and is_numeric($row['pages_id'])) {
					Pages::update($row['pages_id'], $_POST);
				}
				# Not set, insert
				else {
					Pages::insert($row);
				}
			}
			# Errors in form
			else {
				self::$tplVars['errors'] = true;
			}

			if (!XHR) {
				if (substr($row['url_str'], 0, 2) == '__') {
					redirect('?saved_page');
				}
				else {
					redirect(Router::urlFor('Page', $row) . '?saved_page');
				}
			}
		}
	}
?>
