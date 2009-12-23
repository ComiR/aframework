<?php
	class aBlog_CommentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# Work out the article ID, GET on certain ajax-requests
			if (isset($_GET['articles_id'])) {
				$articlesID = $_GET['articles_id'];
			}
			# POST for when deleting all spams (on ajax too)
			elseif (isset($_POST['articles_id'])) {
				$articlesID = $_POST['articles_id'];
			}
			# Normal page-load, get it from the article-module
			elseif (isset(aBlog_ArticleModule::$tplVars['article']['articles_id'])) {
				$articlesID = aBlog_ArticleModule::$tplVars['article']['articles_id'];
			}

			# Make sure we know which article we're on
			if ($articlesID) {
				self::$tplVars['articles_id'] = $articlesID;
			}
			else {
				self::$tplFile = false;
			}

			# Handle delete, mark as spam and mark as ham
			if (isset($_POST['comments_delete']) and ADMIN) {
				self::deleteComment($_POST['comments_id']);
			}
			if (isset($_POST['comments_spam']) and ADMIN) {
				self::spamComment($_POST['comments_id']);
			}
			if (isset($_POST['comments_ham']) and ADMIN) {
				self::hamComment($_POST['comments_id']);
			}
			if (isset($_POST['comments_delete_all_spam'])) {
				Comments::deleteAllSpamForArticle($articlesID);

				if (!XHR) {
					redirect('?deleted_all_spam');
				}
			}

			# Grab the comments for this article
			self::$tplVars['comments'] = Comments::getCommentsByArticleID($articlesID, ADMIN);

			if (!self::$tplVars['comments']) {
				self::$tplFile = 'NoComments';
			}
		}

		private static function deleteComment ($id) {
			Comments::delete($id);

			if (!XHR) {
				redirect('?deleted_comment');
			}
		}

		private static function spamComment ($id) {
			Comments::update($id, array('karma' => 0));

			if (!XHR) {
				redirect('?spammed_comment');
			}
		}

		private static function hamComment ($id) {
			Comments::update($id, array('karma' => 1));

			if (!XHR) {
				redirect('?hammed_comment');
			}
		}
	}
?>
