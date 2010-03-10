<?php
	class Sidkritik_AddSiteModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# Create the form (give all the fields values from POST)
			$form = new FormHandler();

			$form->addValuesArray($_POST);

			# Add all the fields
			$form->addField(array(
				'name'		=> 'title', 
				'title'		=> Lang::get('Site Title'),
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'url', 
				'title'		=> Lang::get('URL'),
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'thumb_url', 
				'title'		=> Lang::get('URL to Thumbnail')
			));
			$form->addField(array(
				'name'		=> 'content', 
				'title'		=> Lang::get('Description'), 
				'type'		=> 'textarea',
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'author', 
				'title'		=> Lang::get('Your Name'), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'email', 
				'title'		=> Lang::get('And E-mail'), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'add_site_submit', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));

			# User is submitting form
			# Make sure form is valid (true => check for spam as well)
			if (isset($_POST['add_site_submit']) and $form->validate(true)) {
				# Add new site
				Sites::insert(array(
					'author'		=> $_POST['author'], 
					'email'			=> $_POST['email'], 
					'title'			=> $_POST['title'], 
					'content'		=> $_POST['content'], 
					'thumb_url'		=> isset($_POST['thumb_url']) ? $_POST['thumb_url'] : '', 
					'url'			=> $_POST['url'], 
					'url_str'		=> Router::urlize($_POST['title']), 
					'pub_date'		=> date('Y-m-d H:i:s')
				));

				# Redirect after POST
				redirect('?added_site');
			}

			# Form has been submitted
			if (isset($_GET['added_site'])) {
				self::$tplFile = 'ThankYou';
			}
			# Form has NOT been submitted
			else {
				# Assign form HTML to template vars
				self::$tplVars['form_html'] = $form->asHTML();
			}
		}
	}
?>
