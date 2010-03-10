<?php
	class aBlog_PostCommentModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# An article must be set in order to display the post comment form
			# We use the article-module's articles_id but on ajax-requests
			# it won't be set so then we use the $post.articles_id from the form instead
			$articlesID = isset($_POST['articles_id']) ? $_POST['articles_id'] : (isset(aBlog_ArticleModule::$tplVars['article']['articles_id']) ? aBlog_ArticleModule::$tplVars['article']['articles_id'] : false);

			if ($articlesID) {
				$visitorData = VisitorData::getVisitorData();

				# Create the form (give all the fields values from POST or visitorData)
				$form = new FormHandler('post', '', Lang::get('Post Comment'));

				$form->addValuesArray($visitorData);
				$form->addValuesArray($_POST);

				# Add all the fields
				$form->addField(array(
					'name'		=> 'author', 
					'title'		=> Lang::get('Your Name'),
					'required'	=> true
				));
				$form->addField(array(
					'name'		=> 'email', 
					'title'		=> Lang::get('E-mail'), 
					'required'	=> true
				));
				$form->addField(array(
					'name'		=> 'website', 
					'title'		=> Lang::get('Website')
				));
				$form->addField(array(
					'name'		=> 'content', 
					'title'		=> Lang::get('And Comment'),
					'type'		=> 'textarea', 
					'required'	=> true
				));
				$form->addField(array(
					'title'		=> Lang::get('Remember Me'), 
					'name'		=> 'remember_visitor_data', 
					'type'		=> 'checkbox', 
					'checked'	=> true, 
					'value'		=> '1'
				));
				$form->addField(array(
					'name'		=> 'post_comment_submit', 
					'type'		=> 'hidden', 
					'value'		=> '1'
				));
				$form->addField(array(
					'name'		=> 'articles_id', 
					'type'		=> 'hidden', 
					'value'		=> $articlesID
				));

				# User is submitting form
				# Make sure form is valid (true => check for spam as well)
				if (isset($_POST['post_comment_submit']) and $form->validate(true)) {
					Comments::insert($_POST);

					if (!XHR) {
						redirect(msg('Inserted Comment', 'The comment was successfully inserted.'));
					}
				}

				# Form has been submitted
				if (isset($_GET['added_comment'])) {
				#	self::$tplFile = 'ThankYou';
				}
				# Form has NOT been submitted
				else {
					# Assign form HTML to template vars
					self::$tplVars['form_html'] = $form->asHTML();
				}
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>
