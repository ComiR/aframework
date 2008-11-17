<?php
	class aCMS_PageModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			self::showThePage();

			if(isset($_POST['page_submit']) and ADMIN) {
				self::updatePage($_POST);
			}
			if(isset($_POST['page_delete_submit']) and ADMIN) {
				self::deletePage($_POST['page_delete_submit']);
			}
		}

		private static function showThePage() {
			# Try to get $get.url_str, else get home-page
			$page = Pages::getPageByUrlStr(isset($_GET['url_str']) ? $_GET['url_str'] : 'home');

			# If page didn't exist, no url_str is set and we're admin
			if(!$page and !isset($_GET['url_str']) and ADMIN) {
				aFramework_BaseModule::$tplVars['html_title'] = 'Add a page';
			}
			# No page exists
			elseif(!$page) {
				FourOFour::run();
			}
			# We found a page
			else {
				self::$tplVars = $page;

				aFramework_BaseModule::$tplVars['html_title']		= $page['title'];
				aFramework_BaseModule::$tplVars['meta_description']	= $page['meta_description'];
				aFramework_BaseModule::$tplVars['meta_keywords']	= $page['meta_keywords'];
			}
		}

		private static function deletePage($id) {
			Pages::delete($id);
		}

		private static function updatePage($row) {
			# If a page ID is set, update
			if(!empty($_POST['pages_id']) and is_numeric($_POST['pages_id'])) {
				Pages::update($_POST);

				if(!XHR) {
					redirect('?updated_page');
				}
			}
			# Not set, insert
			else {
				# Make sure mandatory fields are filled out
				if(
					isset($_POST['title']) and !empty($_POST['title']) and 
					isset($_POST['content']) and !empty($_POST['content']) and 
					isset($_POST['url_str']) and !empty($_POST['url_str'])
				) {
					Pages::insert($_POST);

					if(!XHR) {
						redirect(Router::urlFor('Page', array('url_str' => $_POST['url_str'])));
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