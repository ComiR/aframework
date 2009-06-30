<?php
	class aBlog_ArticleModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['article_delete']) and ADMIN) {
				self::deleteArticle($_POST['articles_id']);
			}
			elseif (isset($_POST['article_submit']) and ADMIN) {
				self::updateArticle($_POST);
			}

			self::$tplVars['inserted']	= isset($_GET['inserted_article']);
			self::$tplVars['deleted']	= isset($_GET['deleted_article']);

			self::showTheArticle();
		}

		private static function showTheArticle () {
			if (!isset($_GET['url_str']) and ADMIN) {
				aFramework_BaseModule::$tplVars['html_title'] = Lang::get('Add an Article');
			}
			else {
				$article = isset($_GET['url_str']) ? Articles::getArticleByURLStr($_GET['url_str']) : Articles::get('pub_date', 'DESC', 0, 1);

				if (!$article) {
					FourOFour::run();
				}
				else {
					self::$tplVars['article']			= $article;
					self::$tplVars['article']['tags']	= Tags::getTagsByArticlesID(self::$tplVars['article']['articles_id']);
					self::$tplVars['more_cut']			= true;

					if (isset($_GET['url_str'])) {
						aFramework_BaseModule::$tplVars['html_title']		= $article['title'];
						aFramework_BaseModule::$tplVars['meta_description']	= $article['meta_description'];
						aFramework_BaseModule::$tplVars['meta_keywords']	= $article['meta_keywords'];

						self::$tplVars['more_cut'] = false;
					}
				}
			}
		}

		private static function deleteArticle ($id) {
			Articles::delete($id);

			if (!XHR) {
				redirect(Router::urlFor('Home') . '?deleted_article');
			}
		}

		private static function updateArticle ($row) {
			# If an article ID is set, update
			if (!empty($row['articles_id']) and is_numeric($row['articles_id'])) {
				Articles::update($row['articles_id'], $_POST);

				if (!XHR) {
					redirect('?updated_article');
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
					Articles::insert($row);

					if (!XHR) {
						redirect(Router::urlFor('Home') . '?inserted_article');
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