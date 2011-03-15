<?php
	class aFramework_ContactModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$visitorData = VisitorData::getVisitorData();

			# Create the form (give all the fields values from POST or visitorData)
			$form = new FormHandler('post', '', Lang::get('Send'));

			$form->addValuesArray($visitorData);
			$form->addValuesArray($_POST);

			# Add all the fields
			$form->addField(array(
				'name'		=> 'name', 
				'title'		=> Lang::get('Your Name'),
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'email', 
				'title'		=> Lang::get('E-mail'), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'message', 
				'title'		=> Lang::get('And Message'),
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
				'name'		=> 'contact_submit', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));

			# User is submitting form
			# Make sure form is valid (true => check for spam as well)
			if (isset($_POST['contact_submit']) and $form->validate(true)) {
				mail(Config::get('general.contact_email'), 'From ' . Config::get('general.site_title'), $_POST['message'], 'From: ' . $_POST['name'] . ' <' . $_POST['email'] . ">\r\n");

				if (!XHR) {
					redirect('?msg_sent');
				}

				self::$tplFile = 'MsgSent';
			}

			if (isset($_GET['msg_sent'])) {
				self::$tplFile = 'MsgSent';
			}
			else {
				self::$tplVars['form_html'] = $form->asHTML();
			}
		}
	}
?>
