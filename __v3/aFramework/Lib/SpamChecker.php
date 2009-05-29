<?php
	class SpamChecker {
		public static function isSpam ($fields, $threshold = 1) {
			$score		= 0;
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
							'url>'
						);

			#####
			# Check for link frequency in content
			$count = substr_count(strtolower($fields['content']), 'http://');

			# Negative score for more than 2 links
			if ($count > 2) {
				$score -= $count;
			}
			# Positive score for less than 2 links
			if ($count < 2) {
				$score += 2;
			}
			# Positive score for no links long content
			if ($count == 0 && strlen($fields['content'] > 20)) {
				$score += 2;
			}
			# Negative score for short content
			if (strlen($fields['content'] < 20)) {
				$score -= 1;
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
				}
			}

			#####
			# Check for bad URL signs
			$str		= strtolower($fields['url']);
			$badURLs	= array('.html', '.info', '?', '&', 'free');

			foreach($badURLs as $url) {
				if (strpos($str, $url) !== false) {
					$score--;
				}
			}

			# Check for .de or .pl domains since they tend to spam
			$score -= preg_match('/\.(de|pl|cn)(\/|$)/', $fields['url']) ? 2 : 0;

			# Mark this -2 because it's always spam
			$score -= preg_match('/-.*-.*htm$/', $fields['url']) ? 2 : 0;

			# spam urls are on average 38 chars long
			$score -= strlen($c['url']) > 30 ? 1 : 0;

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
				}
			}

			#####
			# Check if URL is in author
			$score -= (substr_count(strtolower($fields['author']), 'http://') * 2);

			#####
			# Check if body has been used before
		#	$score -= $comments->findCount( array("Comment.body"=>$c['body']) );

			#####
			# Check if we're coming up with nonsense words
			preg_match_all('/[bcdfghjklmnpqrstvwxz]{5}/', strtolower($fields['email'] . $fields['author']), $matches);
			$score -= count($matches[0]);

			return $score;
		}
	}
?>
