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
			# Try to get $get.url_str, else get home-page
			$page = Pages::getPageByURLStr(isset(Router::$params['url_str']) ? Router::$params['url_str'] : 'home');

			# If no url_str is set and we're admin
			if (!isset(Router::$params['url_str']) and ADMIN) {
				aFramework_BaseModule::$tplVars['html_title'] = Lang::get('Add a Page');
			}
			# No page exists
			elseif (!$page) {
				FourOFour::run();
			}
			# We found a page
			else {
				self::$tplVars['page'] = $page;

				if (Router::$params['controller'] != 'Home') {
					aFramework_BaseModule::$tplVars['html_title']	= $page['title'];
				}

				aFramework_BaseModule::$tplVars['meta_description']	= $page['meta_description'];
				aFramework_BaseModule::$tplVars['meta_keywords']	= $page['meta_keywords'];

				if (Router::$params['controller'] == 'Page') {
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
			# If a page ID is set, update
			if (!empty($row['pages_id']) and is_numeric($row['pages_id'])) {
				Pages::update($row['pages_id'], $_POST);

				if (!XHR) {
					redirect('?updated_page');
				}
			}
			# Not set, insert
			else {
				# Make sure mandatory fields are filled out
				if (
					isset($row['title']) and !empty($row['title']) and 
					isset($row['content']) and !empty($row['content']) and 
					isset($row['url_str']) and !empty($row['url_str'])
				) {
					Pages::insert($row);

					if (!XHR) {
						redirect(Router::urlFor('Page', array('url_str' => $row['url_str'])) . '?inserted_page');
					}
				}
				# Errors in form
				else {
					self::$tplVars['errors'] = true;
				}
			}
		}
	}
?>
