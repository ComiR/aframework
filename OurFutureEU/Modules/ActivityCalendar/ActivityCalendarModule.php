<?php
	class OurFutureEU_ActivityCalendarModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::showTheCalendar();

			if (ADMIN) {
			#	self::handleAddActivity();
				self::handleAddActivityNoForm();

				if (SU) {
					self::handleDeleteActivity();
				}
			}
		}

		private static function handleAddActivityNoForm () {
			if (isset($_POST['add_activity'])) {
				if (isset($_POST['content']) and !empty($_POST['content'])) {
					Activities::insert(array(
						'title'			=> '', 
						'content'		=> $_POST['content'], 
						'pub_date'		=> $_POST['pub_date'] . ' ' . $_POST['pub_time'] . ':00'
					));

					# Redirect after POST
					redirect(msg('Inserted Activity', 'The activity was successfully inserted.'));
				}
				else {
					redirect(msg('Error Inserting Activity', 'There was an error inserting the activity. The content field appears to be empty. Please try again.', true));
				}
			}
		}

		private static function showTheCalendar () {
			# Get the year/month the user is browsing
			if (isset(Router::$params['year']) and isset(Router::$params['month'])) {
				$year	= Router::$params['year'];
				$month	= Router::$params['month'];
			}
			# Or the current year month
			else {
				$year	= date('Y');
				$month	= date('m');
			}

			$firstDayOfMonth = mktime(0, 0, 0, $month, 1, $year);

			# Store previous month
			$previousMonth = mktime(0, 0, 0, $month - 1, 1, $year);
			$previousMonth = array(
				'ts'	=> $previousMonth, 
				'month'	=> date('m', $previousMonth), 
				'year'	=> date('Y', $previousMonth)
			);

			# And next month
			$nextMonth = mktime(0, 0, 0, $month + 1, 1, $year);
			$nextMonth = array(
				'ts'	=> $nextMonth, 
				'month'	=> date('m', $nextMonth), 
				'year'	=> date('Y', $nextMonth)
			);

			# Assign to template
			self::$tplVars = array(
				'selected_month'	=> array(
					'url'	=> "#$year-$month", # Router::urlFor('activitiesByMonth', array('year' => $year, 'month' => $month)), 
					'title'	=> date('F Y', $firstDayOfMonth)
				), 
				'previous_month'	=> array(
					'url'	=> "#{$previousMonth['year']}-{$previousMonth['month']}", # Router::urlFor('activitiesByMonth', array('year' => $previousMonth['year'], 'month' => $previousMonth['month'])), 
					'title'	=> date('F Y', $previousMonth['ts'])
				), 
				'next_month'	=> array(
					'url'	=> "#{$nextMonth['year']}-{$nextMonth['month']}", # $year . $month >= date('Ym') ? false : Router::urlFor('activitiesByMonth', array('year' => $nextMonth['year'], 'month' => $nextMonth['month'])), 
					'title'	=> date('F Y', $nextMonth['ts'])
				)
			);

			# Now get all the activities for this month
			$activities = Activities::get('pub_date', 'ASC', 0, 100000, "DATE_FORMAT(pub_date, '%Y') = '$year' AND DATE_FORMAT(pub_date, '%m') = '$month'");

			# And build the week/day array
			$blanks			= date('w', $firstDayOfMonth);
			$daysInMonth	= date('t', $firstDayOfMonth);
			$weeksInMonth	= ceil(($daysInMonth + $blanks) / 7);
			$actualDays		= 0;
			$todayDayNum	= date('d');

			for ($week = 0; $week < $weeksInMonth; $week++) {
				for ($day = 0; $day < 7; $day++) {
					if (($week == 0 and ($day < $blanks)) or ($actualDays >= $daysInMonth)) {
						self::$tplVars['weeks'][$week]['days'][$day]['blank'] = true;
					}
					else {
						$actualDays	   += 1;
						$numActivities	= 0;
						$dayNum			= $actualDays > 9 ? $actualDays : "0$actualDays";

						if ($activities) {
							foreach ($activities as $activity) {							

								if ($dayNum == $activity['day']) {
									$numActivities++;
								}
							}
						}

						self::$tplVars['weeks'][$week]['days'][$day] = array(
							'num_activities'	=> $numActivities, 
							'num'				=> $actualDays,	
							'url'				=> Router::urlForModule('Activities') . "&date=$year-$month-$dayNum", 
							'today'				=> ($year == date('Y') and $month == date('m') and $actualDays == $todayDayNum) ? true : false
						);
					}
				}
			}
		}

		private static function handleAddActivity () {
			$form = new FormHandler();

			$form->addValuesArray($_POST);
			$form->addValuesArray(array('pub_date' => date('Y-m-d H:i:s')));

			$form->addField(array(
				'name'		=> 'title', 
				'title'		=> Lang::get('Title'),
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'content', 
				'title'		=> Lang::get('Content'), 
				'type'		=> 'textarea',
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'pub_date', 
				'title'		=> Lang::get('Date'), 
				'required'	=> true
			));
			$form->addField(array(
				'name'		=> 'add_activity', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));

			if (isset($_POST['add_activity']) and $form->validate()) {
				Activities::insert(array(
					'title'			=> $_POST['title'], 
					'content'		=> $_POST['content'], 
					'pub_date'		=> $_POST['pub_date']
				));

				# Redirect after POST
				redirect(msg('Inserted Activity', 'The activity was successfully inserted.'));
			}

			self::$tplVars['form_html'] = $form->asHTML();
		}

		private static function handleDeleteActivity () {
			if (isset($_POST['delete_activity'])) {
				Activities::delete($_POST['activities_id']);

				# Redirect after POST
				redirect(msg('Deleted Activity', 'The activity was successfully deleted.'));
			}
		}
	}
?>
