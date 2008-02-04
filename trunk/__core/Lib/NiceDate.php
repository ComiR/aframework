<?php
	function nd($d, $l = 'se') {
		$nd = new NiceDate($d);
		return $nd->getTimeSinceStr($l);
	}

	/**
	 * Takes a date in any format accepted by
	 * strtotime and does stuff with it
	 *
	 * @class NiceDate
	 */
	class NiceDate {
		private $timeStamp = false;
		private $timeSince = false;
		private $timeSinceStr = false;
		private $lang = false;

		/**
		 * Saves timestamp sand constructs language array
		 *
		 * @method __construct
		 * @param {String} $d, date in any format accepted by strtotime
		 */
		public function __construct($d) {
			$this->timeStamp = strtotime($d);

			$this->lang = array();
			$this->lang['en']	= array(
				'years'		=> 'years',
				'year'		=> 'year',
				'months'	=> 'months',
				'month'		=> 'month',
				'weeks'		=> 'weeks',
				'week'		=> 'week',
				'days'		=> 'days',
				'day'		=> 'day',
				'hours'		=> 'hours',	
				'hour'		=> 'hour',
				'minutes'	=> 'minutes',
				'minute'	=> 'minute',
				'seconds'	=> 'seconds',
				'second'	=> 'second',
				'and'		=> 'and',
				'ago'		=> 'ago', 
				'recently'	=> 'just now'
			);
			$this->lang['se']	= array(
				'years'		=> 'år',
				'year'		=> 'år',
				'months'	=> 'månader',
				'month'		=> 'månad',
				'weeks'		=> 'veckor',
				'week'		=> 'vecka',
				'days'		=> 'dagar',
				'day'		=> 'dag',
				'hours'		=> 'timmar',
				'hour'		=> 'timme',
				'minutes'	=> 'minuter',
				'minute'	=> 'minut',
				'seconds'	=> 'sekunder',
				'second'	=> 'sekund',
				'and'		=> 'och',
				'ago'		=> 'sedan', 
				'recently'	=> 'alldeles nyss'
			);
		}

		/**
		 * Returns time-since array
		 *
		 * @method getTimeSince
		 */
		public function getTimeSince() {
			if($this->timeSince === false) {
				$this->_getTimeSince();
			}

			return $this->timeSince;
		}

		/**
		 * Returns time-since array
		 *
		 * @method _getTimeSince
		 */
		private function _getTimeSince() {
			$years		= 0;
			$months		= 0;
			$weeks		= 0;
			$days		= 0;
			$hours		= 0;
			$minutes	= 0;
			$seconds	= 0;

			$diff		= time() - $this->timeStamp;

			$years		= floor($diff / (365*24*60*60));
			$diff		= $diff % (365*24*60*60);
			$months		= floor($diff / ((365/12)*(24*60*60)));
			$diff		= $diff % ((365/12)*(24*60*60));
			$weeks		= floor($diff / (7*24*60*60));
			$days		= floor($diff / (24*60*60)) % 7;
			$hours		= floor($diff / (60*60)) % 24;
			$minutes	= floor($diff / 60) % 60;
			$seconds	= $diff % 60;

			$this->timeSince = array(
				'years'		=> $years, 
				'months'	=> $months, 
				'weeks'		=> $weeks, 
				'days'		=> $days, 
				'hours'		=> $hours, 
				'minutes'	=> $minutes,
				'seconds'	=> $seconds, 
				'diff'		=> $diff
			);
		}

		/**
		 * Returns time-since string
		 *
		 * @method getTimeSince
		 * @param {String} $l, language, default 'en'
		 */
		public function getTimeSinceStr($l = 'en') {
			if($this->timeSince === false) {
				$this->_getTimeSince();
			}
			if($this->timeSinceStr === false) {
				$this->_getTimeSinceStr($l);
			}

			return $this->timeSinceStr;
		}

		/**
		 * Returns time-since string
		 *
		 * @method _getTimeSince
		 * @param {String} $l, language, default 'en'
		 */
		private function _getTimeSinceStr($l = 'en') {
			$bits = array();

			if($this->timeSince['diff'] < 3600) {
				$this->timeSinceStr = $this->lang[$l]['recently'];
				return;
			}

			foreach($this->timeSince as $unit => $v) {
				if($unit != 'diff' and $unit != 'seconds' and $this->timeSince[$unit] != 0) {
					if($this->timeSince[$unit] == 1) {
						$singularUnit = substr($unit, 0, -1);
						$bits[] = $this->timeSince[$unit] .' ' .$this->lang[$l][$singularUnit];
					}
					else {
						$bits[] = $this->timeSince[$unit] .' ' .$this->lang[$l][$unit];
					}
				}
			}

			$num = count($bits);
			$i = 1;
			$this->timeSinceStr = '';

			foreach($bits as $bit) {
				if($i == $num and $num != 1) {
					$this->timeSinceStr .= $this->lang[$l]['and'] .' ';
				}

				$this->timeSinceStr .= $bit;

				if($i++ == $num) {
					$this->timeSinceStr .= ' ' .$this->lang[$l]['ago'];
				}
				elseif($i == $num) {
					$this->timeSinceStr .= ' ';
				}
				else {
					$this->timeSinceStr .= ', ';
				}
			}
		}
	}
?>