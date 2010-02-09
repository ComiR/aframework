<?php
	class Sidkritik_SiteReviewsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# Thumb up a review
			if (isset($_POST['site_reviews_thumbs_up_submit'])) {
				SiteReviews::thumbUpReview($_POST['site_reviews_id']);

				if (!XHR) {
					redirect('?thumbed_up_review');
				}
			}

			# Thumb down a review
			if (isset($_POST['site_reviews_thumbs_down_submit'])) {
				SiteReviews::thumbDownReview($_POST['site_reviews_id']);

				if (!XHR) {
					redirect('?thumbed_down_review');
				}
			}

			# Display the site reviews
			if (isset(Sidkritik_SiteModule::$tplVars['site']['sites_id'])) {
				$sitesID = Sidkritik_SiteModule::$tplVars['site']['sites_id'];
				$reviews = SiteReviews::get('thumb_score', 'DESC', 0, 1000000, "sites_id = $sitesID");

				if ($reviews) {
					$reviews = self::buildCommentsForms($reviews);
					$reviews = self::getReviewComments($reviews);

					self::$tplVars['reviews'] = $reviews;
				}
				else {
					self::$tplFile = false;
				}
			}
			else {
				self::$tplFile = false;
			}
		}

		private static function getReviewComments ($reviews) {
			$newReviews = array();

			foreach ($reviews as $review) {
				$review['comments'] = SiteReviewComments::getBySiteReviewsID($review['site_reviews_id']);

				$newReviews[] = $review;
			}

			return $newReviews;
		}

		private static function buildCommentsForms ($reviews) {
			$visitorData	= VisitorData::getVisitorData();
			$forms			= array();
			$newReviews		= array();

			foreach ($reviews as $review) {
				$forms[$review['site_reviews_id']] = new FormHandler();

				$forms[$review['site_reviews_id']]->addValuesArray($visitorData);
				$forms[$review['site_reviews_id']]->addValuesArray($_POST);

				$forms[$review['site_reviews_id']]->addField(array(
					'name'		=> 'email', 
					'title'		=> Lang::get('Your E-mail'), 
					'required'	=> true
				));
				$forms[$review['site_reviews_id']]->addField(array(
					'name'		=> 'content', 
					'title'		=> Lang::get('And Comment'), 
					'type'		=> 'textarea',
					'required'	=> true
				));
				$forms[$review['site_reviews_id']]->addField(array(
					'name'		=> 'site_reviews_id', 
					'type'		=> 'hidden', 
					'value'		=> $review['site_reviews_id']
				));
				$forms[$review['site_reviews_id']]->addField(array(
					'name'		=> 'site_review_add_comment_submit', 
					'type'		=> 'hidden', 
					'value'		=> '1'
				));

				$review['post_comment_form_html'] = $forms[$review['site_reviews_id']]->asHTML();

				$newReviews[$review['site_reviews_id']] = $review;
			}

			# Listen to form submissions
			if (isset($_POST['site_review_add_comment_submit'])) {
				if ($forms[$_POST['site_reviews_id']]->validate(true)) {
					SiteReviewComments::insert($_POST);

					if (!XHR) {
						redirect('?posted_review_comment');
					}
				}
				else {
					$newReviews[$_POST['site_reviews_id']]['post_comment_form_html'] = $forms[$_POST['site_reviews_id']]->asHTML();
				}
			}

			return $newReviews;
		}
	}
?>
