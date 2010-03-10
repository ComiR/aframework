<?php
	class aBlog_ArticleModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['article_delete']) and SU) {
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
			# If no particular article is requested and we're admin
			if (!isset(Router::$params['url_str']) and ADMIN) {
				if (Router::getController() != 'Home') {
					aFramework_BaseModule::$tplVars['html_title'] = Lang::get('Add an Article');
				}
			}
			# Or if we're on the AddArticle-page and NOT admin
			elseif (Router::getController() == 'AddArticle' and !ADMIN) {
				FourOFour::run();
			}
			# Or it's a normal article-display
			else {
				# If url_str is set get that article else get latest article
				$article = isset(Router::$params['url_str']) ? Articles::getArticleByURLStr(Router::$params['url_str'], ADMIN) : Articles::get('pub_date', 'DESC', 0, 1);

				# Make sure URL-date is the same as article-date if a particular article is requested
				if (isset(Router::$params['url_str'])) {
					$urlYMD = Router::$params['year'] . Router::$params['month'] . Router::$params['day'];
					$articleYMD = $article['year'] . $article['month'] . $article['day'];
				}
				# If no article exists or the URL-date isn't the same run 404
				if (!$article or (isset(Router::$params['url_str']) and $urlYMD != $articleYMD)) {
					FourOFour::run();
				}
				# Article exists and URL-date is either correct or not set - display article
				else {
					self::$tplVars['article']			= $article;
					self::$tplVars['article']['tags']	= Tags::getTagsByArticlesID(self::$tplVars['article']['articles_id']);
					self::$tplVars['more_cut']			= true;

					if (isset(Router::$params['url_str'])) {
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
			Tags::deleteTagsForArticle($id);
			# Comments::deleteCommentsForArticle($id);

			if (!XHR) {
				redirect(Router::urlFor('AddArticle') . msg('Deleted Article', 'The article was successfully deleted.'));
			}
		}

		private static function updateArticle ($row) {
			$row['url_str']		= empty($row['url_str']) ? $row['title'] : $row['url_str'];
			$row['url_str']		= Router::urlize($row['url_str']);
			$row['pub_date']	= empty($row['pub_date']) ? date('Y-m-d H:i:s') : $row['pub_date'];
			$new				= false;

			# Make sure mandatory fields are filled out
			if (
					isset($row['title']) and !empty($row['title']) and 
					isset($row['content']) and !empty($row['content'])
				) {
				# If an article ID is set, update
				if (!empty($row['articles_id']) and is_numeric($row['articles_id'])) {
					Articles::update($row['articles_id'], $_POST);

					Tags::updateTagsForArticle($row['articles_id'], $_POST['tags']);
				}
				# Not set, insert
				else {
					Articles::insert($row);

					$new = true;
					$row['articles_id']	= mysql_insert_id();

					Tags::updateTagsForArticle($row['articles_id'], $_POST['tags']);
				}

				$row['year']	= isset($row['year']) ? $row['year'] : substr($row['pub_date'], 0, 4);
				$row['month']	= isset($row['month']) ? $row['month'] : substr($row['pub_date'], 5, 2);
				$row['day']		= isset($row['day']) ? $row['day'] : substr($row['pub_date'], 8, 2);

				if (!XHR) {
					if ($new) {
						redirect(Router::urlFor('Article', $row) . msg('Inserted Article', 'The article was successfully inserted.'));
					}
					else {
						redirect(Router::urlFor('Article', $row) . msg('Updated Article', 'The article was successfully updated.'));
					}
				}
			}
		}
	}
?>
