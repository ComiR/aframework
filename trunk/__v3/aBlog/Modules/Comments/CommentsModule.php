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
			if (!$articlesID) {
				return self::$tplFile = false;
			}

			self::$tplVars['articles_id'] = $articlesID;

			# We need the article in order to check if comments are even allowed
			$article = isset(aBlog_ArticleModule::$tplVars['article']) ? aBlog_ArticleModule::$tplVars['article'] : Articles::getArticleByID($articlesID, ADMIN);

			# Handle delete, mark as spam and mark as ham
			if (isset($_POST['comments_delete']) and SU) {
				self::deleteComment($_POST['comments_id']);
			}
			if (isset($_POST['comments_spam']) and ADMIN) {
				self::spamComment($_POST['comments_id']);
			}
			if (isset($_POST['comments_ham']) and ADMIN) {
				self::hamComment($_POST['comments_id']);
			}
			if (isset($_POST['comments_delete_all_spam']) and SU) {
				Comments::deleteAllSpamForArticle($articlesID);

				if (!XHR) {
					redirect(msg('Deleted All Spam', 'All spam was successfully deleted.'));
				}
			}

			# Grab the comments for this article
			self::$tplVars['comments'] = Comments::getCommentsByArticleID($articlesID, ADMIN);

			# If there are no comments and comments are closed, don't show nothing
			if (!self::$tplVars['comments'] and !$article['allow_comments']) {
				return self::$tplFile = false;
			}
			# If there are no comments but comments are allowed
			elseif (!self::$tplVars['comments'] and $article['allow_comments']) {
				return self::$tplFile = 'NoComments';
			}
			# There are comments, regardless if comments are allowed display the ones already posted
		}

		private static function deleteComment ($id) {
			Comments::delete($id);

			if (!XHR) {
				redirect(msg('Deleted Comment', 'The comment was successfully deleted.'));
			}
		}

		private static function spamComment ($id) {
			Comments::update($id, array('karma' => 0));

			if (!XHR) {
				redirect(msg('Spammed Comment', 'The comment was successfully marked as spam.'));
			}
		}

		private static function hamComment ($id) {
			Comments::update($id, array('karma' => 1));

			if (!XHR) {
				redirect(msg('Hammed Comment', 'The comment was successfully marked as ham.'));
			}
		}
	}
?>
