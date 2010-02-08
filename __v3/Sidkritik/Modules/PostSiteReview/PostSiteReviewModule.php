<?php
	class Sidkritik_PostSiteReviewModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$sitesID = isset(Sidkritik_SiteModule::$tplVars['site']['sites_id']) ? Sidkritik_SiteModule::$tplVars['site']['sites_id'] : false;

			if (!$sitesID) {
				return self::$tplFile = false;
			}

			$visitorData = VisitorData::getVisitorData();

			# Create the form (give all the fields values from POST or visitorData)
			$form = new FormHandler();

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
				'title'		=> Lang::get('E-mail')
			));
			$form->addField(array(
				'name'		=> 'website', 
				'title'		=> Lang::get('Website')
			));
			$form->addField(array(
				'name'		=> 'rating', 
				'title'		=> Lang::get('Rating'), 
				'type'		=> 'select', 
				'options'	=> array(
					'5'		=> 'Brilliant!', 
					'4'		=> 'Great', 
					'3'		=> 'Good', 
					'2'		=> 'Avarage', 
					'1'		=> 'Bad'
				), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'content', 
				'title'		=> Lang::get('And Review'),
				'type'		=> 'textarea', 
				'required'	=> true, 
				'value'		=> "Detta är en template för hur en recension kan se ut. Du får givetvis strunta i eller lägga till sektioner som du känner för. Den fungerar också som en kort introduktion till Markdown.\n\n# Designen\n\nHär skriver du lite om designen...\n\n# Koden\n\nHär skriver du lite om koden...\n\n# SEO\n\nHär skriver du lite om SEOn...\n\n# Innehållet\n\nHär skriver du lite om innehållet...\n\n# Avslutningsvis\n\n* Kort tips\n* Kort tips 2\n* Etc"
			));
			$form->addField(array(
				'name'		=> 'post_site_review_submit', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));
			$form->addField(array(
				'name'		=> 'sites_id', 
				'type'		=> 'hidden', 
				'value'		=> $sitesID
			));
			$form->addField(array(
				'title'		=> Lang::get('Remember Me'), 
				'name'		=> 'remember_visitor_data', 
				'type'		=> 'checkbox', 
				'checked'	=> true, 
				'value'		=> '1'
			));

			# User is submitting form
			# Make sure form is valid (true => check for spam as well)
			if (isset($_POST['post_site_review_submit']) and $form->validate(true)) {
				# Add new review
				SiteReviews::insert($_POST);

				# Redirect after POST
				redirect('?added_review');
			}

			# Form has been submitted
			if (isset($_GET['added_review'])) {
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
