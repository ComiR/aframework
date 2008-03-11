<?php
	/**
	 * Here's a bunch of handy functions used by
	 * aFramework in various places
	 */

	# Adjusts heading-levels in $html so highest is $l
	function setHighestHeadingLevel($html, $l) {
		for($hl = 1; $hl < 7; $hl++) {
			if(preg_match("/<h$hl(.*?)>/i", $html)) {
				break;
			}
		}

		$a = $l - $hl;

		for($i = 1; $i < 7; $i++) {
			$nl = ($i + $a) > 6 ? 6 : ($i + $a);
			$nl = $nl < 1 ? 1 : $nl;

			$html = preg_replace("/<h$i(.*?)>(.*?)<\/h[1-6]{1,1}>/i", "{{h$nl$1}}$2{{/h$nl}}", $html);
		}

		return preg_replace('/\{\{h([1-6])(.*?)\}\}(.*?)\{\{\/h([1-6])\}\}/i', '<h$1$2>$3</h$4>', $html);
	}

	# Retrieves stored visitor data
	function getVisitorData() {
		$data = false;

		if(isset($_COOKIE['visitor'])) {
			$data = unserialize(stripslashes($_COOKIE['visitor']));
			$data['remembered'] = true;
		}

		return $data;
	}

	# Sets visitor data
	function setVisitorData($data) {
		$validData = array('name', 'email', 'url');
		$oldData = getVisitorData();
		$oldData = $oldData ? $oldData : array();
		$set = array();

		foreach($data as $k => $v) {
			if(in_array($k, $validData)) {
				$set[$k] = $v;
			}
		}

		setcookie('visitor', serialize(array_merge($oldData, $set)), time()+60*60*24*365, "/");
	}

	# Replaces _first_ occurance of needle
	function str_replace_once($needle, $replace, $haystack) {
		if($pos = strpos($haystack, $needle)) {
			return substr_replace($haystack, $replace, $pos, strlen($needle));
		}
		return $haystack;
	}

	# Uses (Micro)Askimet to see whether something is spam or ham. You need to set the WP_KEY_constants in Init.php
	function isSpam($fields) {
		return false;
		# Fields should contain comment_content, comment_author, comment_author_email, comment_author_url (wtf did they prefix them all wiv comment_ ?!)
		$vars = array_merge($fields, array_merge($_SERVER, array('user_ip' => $_SERVER['REMOTE_ADDR'], 'user_agent' => $_SERVER['HTTP_USER_AGENT'])));

		$akismet = new MicroAkismet(WP_KEY_KEY, WP_KEY_URL, AFRAMEWORK_VERSION);

		if($akismet->check($vars)) {
			return true;
		}
		else {
			return false;
		}
	}

	# Fixes camelCase to camel-case (or whatever $separator user wants)
	function ccFix($str, $separator = '-') {
		$str = preg_replace('/([A-Z])/', "$separator\\1", $str);
		if(substr($str, 0, 1) == $separator) {
			return substr($str, 1);
		}
		return $str;
	}

	# Like mysql_real_escape_string
	function escape($str) {
		return mysql_real_escape_string(stripslashes($str));
	//	return (get_magic_quotes_gpc()) ? $str : mysql_real_escape_string($str); // this caused problems somewhere...
	}

	function esc($s) {
		return escape($s);
	}

	# Checks whether an ADMIN_SESSION session or cookie is set
	function isLoggedIn() {
		return (isset($_SESSION[ADMIN_SESSION]) or isset($_COOKIE[ADMIN_SESSION]));
	}

	# Like header:location with a die
	function redirect($url) {
		header("Location: $url");
		die('Please go to <a href="' .$url .'">' .$url .'</a>');
	}

	# Redirects to referrer
	function redirectToReferer($append) {
		$ref = $_SERVER['HTTP_REFERER'];
		$ref = (stristr($ref, '?')) ? $ref .'&' : $ref .'?';

		redirect($ref .$append);
	}

	# Instead of mysql_query, also counts queries and dies on error
	function dbQry($qry, $numQueries = false) {
		static $i = 0;
		if($numQueries) {
			return $i;
		}
		$i++;
		$res = mysql_query($qry) or die(mysql_error() .'<hr /><pre>' .htmlentities($qry) .'</pre>');
		return $res;
	}

	# "Debug" variables
	function debug($foo) {
		header('Content-type: text/plain');
		if(is_array($foo)) {
			echo '# ' .count($foo) ." elements #\n";
		}
		var_dump($foo);
		die;
	}

	# Cuts string to $reqLen's length and focuses around $sr (if existent)
	function searchResult($str, $sr, $reqLen = 250) {
		# Make sure all linebreaks are \n
		$str = str_replace(array("\n\r","\r\n","\r"), "\n", $str);

		# Remove all [code], [more] and stuff like that
		$find = array(
			'/\[code\]/i', 
			'/\[more\]/i', 
			'/\[del\].*\[\/del\]/is', 
			'/!?\[[^\]]*\]\([^\)]*\)/', # Markdown images (unfortunately also links =/)
			'/^|\n#+/' # Markdown headings
		);
		$str = preg_replace($find, '', $str);

		# Cut the string so that search-terms are in the middle
		# (if any search-term IS in the string)
		$start = 0;
		if(($start = strpos(strtolower($str), strtolower($sr))) !== false) {
			$strLen = strlen($str);

			# We want the search-item in the middle of the result-string
			$start = $start - $reqLen / 2;

			# Now it might be a negative value, sort that out
			$start = ($start < 0) ? 0 : $start;

			# Calculate the difference between the start and the end of the string (it might be too short!)
			$diff = $strLen - $start;

			# If the result-string is too short
			if($diff < $reqLen) {
				# Go back as much as needed to fit the number of characters desired
				$start = $start - $reqLen + $diff;

				# Now it might negative again, sort it!
				$start = ($start < 0) ? 0 : $start;
			}
		}

		$threeDotsFirst = ($start > 0) ? '[...] ' : '';
		$threeDotsLast = ((strlen($str) - strlen($start)) > $reqLen) ? ' [...]' : '';

		$str = htmlentities($threeDotsFirst .substr($str, $start, $reqLen) .$threeDotsLast);

		# Make search terms bold
		$srs = explode(' ', $sr);
		foreach($srs as $_sr) {
			$str = preg_replace("/($_sr)/i", '<strong>\\1</strong>', $str);
		}
		
		return $str;
	}
?>