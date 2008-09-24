<?php
	class aFramework_ContactModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(isset($_POST['contact_submit'])) {
				self::sendEmail();
			}

			if(isset($_GET['msg_sent'])) {
				self::$tplFile = 'MsgSent';
			}
			if(isset($_GET['error'])) {
				self::$tplVars['error'] = true;
			}
		}

		private static function sendEmail() {
			if(isset($_POST['message']) and isset($_POST['name']) and isset($_POST['email']) and FormValidator::validate($_POST)) {
				if(!isSpam(array(
					'comment_content'		=> $_POST['message'], 
					'comment_author'		=> $_POST['name'], 
					'comment_author_email'	=> $_POST['email']
				))) {
					mail(CONTACT_EMAIL, 'From Website', $_POST['message'], 'From: ' .$_POST['name'] .' <' .$_POST['email'] .">\r\n");
				}

				if(!XHR) {
					redirect('?msg_sent');
				}

				self::$tplFile = 'MsgSent';
			}
			else {
				if(!XHR) {
					redirect('?error');
				}

				self::$tplVars['error'] = true;
			}
		}
	}
?>