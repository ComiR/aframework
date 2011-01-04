<?php
	class SpamChecker {
		private static $info = array();

		public static function getKarma ($f) {
			self::$info	= array();
			$score		= 0;
			$fields		= array(
				'content'	=> isset($f['content'])	? $f['content']	: '', 
				'author'	=> isset($f['author'])	? $f['author']	: '', 
				'email'		=> isset($f['email'])	? $f['email']	: '', 
				'url'		=> isset($f['url'])		? $f['url']		: (isset($f['website']) ? $f['website'] : '')
			);
			$badWords	= array(
				'levitra',
				'viagra',
				'casino',
				'plavix',
				'cialis',
				'ativan',
				'fioricet',
				'rape',
				'acyclovir',
				'penis',
				'phentermine',
				'porno',
				'pharm',
				'ringtone',
				'pharmacy',
				'url>', 
				'vigrx'
			);
			$alwaysSpam	= array(
				'Best Site good looking', 
				"Good crew it's cool :)", 
				'This site is crazy :)', 
				'Jonny was here', 
				'very best job', 
				'real beauty page', 
				'Thanks funny site', 
				'Wonderfull great site', 
				'perfect design thanks', 
				'good material thanks', 
				'Very Good Site', 
				'Best Site Good Work', 
				'good material thanks', 
				'very best job', 
				'Very interesting tale', 
				'Excellent work, Nice Design', 
				'Best Site good looking', 
				'Thanks funny site', 
				"It's funny goodluck", 
				"It's serious", 
				'Very Good Site', 
				'Excellent work, Nice Design', 
				'Cool site goodluck :)', 
				"It's serious", 
				'magic story very thanks',
				"I'm happy very good site", 
				'Very funny pictures', 
				"It's funny goodluck", 
				'Cool site goodluck :)', 
				'Excellent work, Nice Design', 
				'perfect design thanks', 
				'this is be cool 8)', 
				'Wonderfull great site',  
				'Hello good day', 
				'Cool site goodluck :)', 
				'this post is fantastic', 
				'Very interesting tale', 
				'Gloomy tales', 
				'Best Site Good Work', 
				'Thanks funny site', 
				'perfect design thanks'
			);

			if (in_array($fields['content'], $alwaysSpam)) {
				$score -= 10;
			}

			#####
			# Since I use markdown regular links are very likely spam
			if (preg_match('/<a href=".*?">.*?<\/a>/', $fields['content'])) {
				$score -= 5;
			}

			#####
			# Check for link frequency in content
			$count = substr_count(strtolower($fields['content']), 'http://');

			# Negative score for more than 2 links
			if ($count > 2) {
				$score -= $count;
				self::$info[] = 'More than 2 links, -1 point for each link';
			}
			# Positive score for less than 2 links
			if ($count < 2) {
				$score += 2;
				self::$info[] = 'Less than 2 links, +2 points';
			}
			# Positive score for no links long content
			if ($count == 0 && strlen($fields['content'] > 20)) {
				$score += 2;
				self::$info[] = 'No links and content longer than 20 chars, +2 points';
			}
			# Negative score for short content
			if (strlen($fields['content']) < 20) {
				$score -= 1;
				self::$info[] = 'Content less than 20 chars, -1 point';
			}

			#####
			# Check for previous comments (spam or not)
			# Positive score for same-email non-spam comments
		#	$score += $comments->findCount( array('Comment.email'=>$c['email'], 'Comment.status'=>2) );

			# Negative score for same-email SPAM comment
		#	$score -= $comments->findCount( array('Comment.email'=>$c['email'], 'Comment.status'=>0) );

			# Negative score for same IP SPAM comment
		#	$score -= $comments->findCount( array('Comment.ip'=>$c['ip'], 'Comment.status'=>0) );

			#####
			# Check all fields for bad words
			$str = strtolower($fields['content'] . $fields['author'] . $fields['url']);

			foreach($badWords as $word) {
				if (strpos($str, $word) !== false) {
					$score--;
					self::$info[] = '"' . $word . '" found in fields, -1 point';
				}
			}

			#####
			# Check for bad URL signs
			$str		= strtolower($fields['url']);
			$badURLs	= array('.html', '.info', '?', '&', 'free');

			foreach($badURLs as $url) {
				if (strpos($str, $url) !== false) {
					$score--;
					self::$info[] = '"' . $url . '" found in URL, -1 point';
				}
			}

			# Check for .de or .pl domains since they tend to spam
			if (preg_match('/\.(de|pl|cn)(\/|$)/', $fields['url'])) {
				$score -= 2;
				self::$info[] = '.de, .pl or .cn TLD in URL, -2 points';
			}

			# Mark this -2 because it's always spam
			if (preg_match('/-.*-.*htm$/', $fields['url'])) {
				$score -= 2;
				self::$info[] = 'URL matches /-.*-.*htm$/, -2 points';
			}

			# spam urls are on average 38 chars long
			if (strlen($fields['url']) > 30) {
				$score -= 1;
				self::$info[] = 'URL longer than 30 chars, -1 point';
			}

			#####
			# Check spam phrases
			$regexps = array(
						'/^interesting\r\n$/',
						'/^Interesting...\r\n$/',
						'/^Sorry \:\(\r\n$/',
						'/^Nice(!|\.)*\r\n$/',
						'/^Cool(!|\.)*\r\n$/'
			);

			foreach($regexps as $regexp) {
				if (preg_match($regexp, $fields['content'])) {
					$score -= 10;
					self::$info[] = 'Content matches "' . $regexpt . '", -10 points';
				}
			}

			#####
			# Check if URL is in author
			if (($numUrlsInAuthor = substr_count(strtolower($fields['author']), 'http://'))) {
				$score -= $numURLsInAuthor * 2;
				self::$info[] = 'http:// found in author, -2 points per occurence';
			}

			#####
			# Check if body has been used before
		#	$score -= $comments->findCount( array("Comment.body"=>$c['body']) );

			#####
			# Check if we're coming up with nonsense words
			preg_match_all('/[bcdfghjklmnpqrstvwxz]{5}/', strtolower($fields['email'] . $fields['author']), $matches);

			if (count($matches[0])) {
				$score -= count($matches[0]);
				self::$info[] = 'Nonsense words, -X points';
			}

			return $score;
		}

		public static function getInfo () {
			return count(self::$info) ? self::$info : false;
		}
	}
?>
