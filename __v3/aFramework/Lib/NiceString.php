<?php
	require_once 'Markdown.php';

	class NiceString {
		public static function makeNice($str, $markdownHeadingLevel = false, $cutMore = false, $subStr = false, $allowHTMLBlocks = false) {
			$htmlBlocks = array();
			$codeBlocks = array();

			$str = self::convertLinebreaks($str);
			$str = self::subStrCut($str, $subStr);
			if($allowHTMLBlocks) {
				$str = self::extractHTMLBlocks($str, $htmlBlocks);
			}
			$str = self::extractCodeBlocks($str, $codeBlocks);
			$str = self::deleteComments($str);
			$str = self::moreCut($str, $cutMore);
			$str = self::replaceMarkdownBlockquotes($str);
			$str = self::stripHTML($str);
			$str = self::reverseMarkdownBlockquotes($str);
			$str = self::fixMarkdownHeadingLevels($str, $markdownHeadingLevel);
			$str = self::runMarkdown($str);
		#	$str = self::fixImgWidthHeightAttrs($str);
			$str = self::autoAbbr($str);
			$str = self::autoDel($str);
			$str = self::youtubeClips($str);
			if($allowHTMLBlocks) {
				$str = self::insertHTMLBlocks($str, $htmlBlocks);
			}
			$str = self::insertCodeBlocks($str, $codeBlocks);

			return $str;
		}

		private static function convertLinebreaks($str) {
			return str_replace(array("\n\r", "\r\n", "\r"), "\n", $str);
		}

		private static function subStrCut($str, $len) {
			if($len and strlen($str) > ($len + 3)) {
				return substr($str, 0, $len) .'...';
			}

			return $str;
		}

		private static function extractHTMLBlocks($str, &$htmlBlocks) {
			if(substr_count($str, '/[xhtml]/') != substr_count($str, '/[\/xhtml]/')) {
				$str .= '[/xhtml]';
			}

			$pattern = '/\[xhtml\](.+?)\[\/xhtml\]/is';

			preg_match_all($pattern, $str, $htmlBlocks);

			return preg_replace($pattern, "\n\n[EXHTMLBLOCK]\n\n", $str);
		}

		private static function extractCodeBlocks($str, &$codeBlocks) {
			if(substr_count($str, '/[code]/') != substr_count($str, '/[\/code]/')) {
				$str .= '[/code]';
			}

			$inlineStyles = array(
				'<span style="color: #000000">', 
				'<span style="color: #FF8000">', 
				'<span style="color: #007700">', 
				'<span style="color: #0000BB">', 
				'<span style="color: #DD0000">'
			);
			$semanticClasses = array(
				'<span>', 
				'<span class="comment">', 
				'<span class="keyword">', 
				'<span class="var">', 
				'<span class="string">'
			);
			$phpTags = array(
				'<span class="var">&lt;?php<br /></span>', 
				'<span class="var">&lt;?php</span>', 
				'&lt;?php', 
				'<span class="var"><br />?&gt;</span>', 
				'<span class="var">?&gt;</span>', 
				'?&gt;'
			);

			$pattern = '/\[code\](.+?)\[\/code\]/is';

			preg_match_all($pattern, $str, $codeBlocks);

			$str = preg_replace($pattern, "\n\n[EXCODEBLOCK]\n\n", $str);

			for($i = 0, $j = count($codeBlocks[1]); $i < $j; $i++) {
				$hasPHPTags = true;

				$codeBlocks[1][$i] = trim($codeBlocks[1][$i]);

				if(!stristr($codeBlocks[1][$i], '<?php')) {
					$hasPHPTags = false;
					$codeBlocks[1][$i] = "<?php\n" .$codeBlocks[1][$i] ."\n?>";
				}

				$codeBlocks[1][$i] = "<p class=\"code-block\">" .highlight_string($codeBlocks[1][$i], true) ."</p>";
				$codeBlocks[1][$i] = str_replace($inlineStyles, $semanticClasses, $codeBlocks[1][$i]);
				$codeBlocks[1][$i] = str_replace("\n", '', $codeBlocks[1][$i]);

				if(!$hasPHPTags) {
					$codeBlocks[1][$i] = str_replace($phpTags, '', $codeBlocks[1][$i]);
					$codeBlocks[1][$i] = str_replace(array('<code><span><span class="var"><br />', '<br /></span></span></code>'), array('<code><span><span class="var">', '</span></span></code>'), $codeBlocks[1][$i]);
				}
			}

			return $str;
		}

		private static function insertHTMLBlocks($str, $htmlBlocks) {
			foreach($htmlBlocks[1] as $hbm) {
				$str = self::strReplaceOnce("<p>[EXHTMLBLOCK]</p>", $hbm, $str);
			}

			return $str;
		}

		private static function insertCodeBlocks($str, $codeBlocks) {
			foreach($codeBlocks[1] as $cbm) {
				$str = self::strReplaceOnce("<p>[EXCODEBLOCK]</p>", $cbm, $str);
			}

			return $str;
		}

		private static function strReplaceOnce($needle, $replace, $haystack) {
			if(false !== ($pos = strpos($haystack, $needle))) {

				return substr_replace($haystack, $replace, $pos, strlen($needle));
			}

			return $haystack;
		}

		private static function deleteComments($str) {
			return preg_replace('/\[del\].*?\[\/del\]/is', '', $str);
		}

		private static function moreCut($str, $cutMore) {
			if($cutMore) {
				$morePos = strpos($str, '[more]');

				if($morePos !== false) {
					$str = substr($str, 0, $morePos);
				}
			}
			else {
				$str = str_replace('[more]', '', $str);
			}

			return $str;
		}

		private static function replaceMarkdownBlockquotes($str) {
			return preg_replace('/(^|\n)>(.*)/', '$1]$2', $str);
		}

		private static function stripHTML($str) {
			return htmlentities($str);
		}

		private static function reverseMarkdownBlockquotes($str) {
			return preg_replace('/(^|\n)\](.*)/', '$1>$2', $str);
		}

		private static function fixMarkdownHeadingLevels($str, $markdownHeadingLevel) {
			if($markdownHeadingLevel > 0 and $markdownHeadingLevel < 7) {
				# Find the highest heading level in the string
				$levels = array();
				for($highestLevel = 1; $highestLevel < 7; $highestLevel++) {
					$match = '/(^|\n)#{' .$highestLevel .',' .$highestLevel .'} {0,}[^#]*($|\n)/';
					if(preg_match($match, $str)) {
						break;
					}
				}
				# If the highest level is higher (less #) than ours, add x # to each heading
				if($highestLevel < $markdownHeadingLevel) {
					$diff		= $markdownHeadingLevel - $highestLevel;
					$find		= '/(^|\n)(#+)( {0,})([^$\n]*)/';
					$replace	= '$1$2' .str_repeat('#', $diff) .'$3$4';
					$str		= preg_replace($find, $replace, $str);
				}
				# If the $str's highest level is lower (more #) than ours, subtract X # to all headings
				elseif($highestLevel > $markdownHeadingLevel) {
					$diff		= $highestLevel - $markdownHeadingLevel;
					$find		= '/(^|\n)(#+)( {0,})([^$\n]*)/e';
					$replace	= "'$1' .substr(\"$2\", 0, strlen(\"$2\")-$diff) .'$3$4'";
					$str		= preg_replace($find, $replace, $str);
				}
				# else - The string is already gtg
			}

			return $str;
		}

		private static function runMarkdown($str) {
			return markdown($str);
		}

		private static function fixImgWidthHeightAttrs($str) {
			return preg_replace_callback('/<img src="(.*?)"(.*?) \/>/', 'self::fixImgWidthHeightAttrsCallback', $str);
		}

		private static function fixImgWidthHeightAttrsCallback($matches) {
			$rootDir	= str_replace('//', '/', $_SERVER['DOCUMENT_ROOT'] .'/');
			$isSmall	= false;
			$filePath	= substr($matches[1], 1);

			if(stristr($filePath, '_small.')) {
				$isSmall	= true;
				$filePath	= str_replace('_small.', '.', $filePath);
				$pathQry	= explode('?', $filePath);
				$filePath	= $pathQry[0];
				$qry		= (isset($pathQry[1])) ? $pathQry[1] : '';
				$widthMatch	= array();
				$pattern	= '/w=([0-9]+)&?/';
				preg_match($pattern, $qry, $widthMatch);
				$smallWidth	= (isset($widthMatch[1])) ? $widthMatch[1] : 100; // should be same as default Thumb.php-size for accuracy
			}

			if(file_exists($rootDir .$filePath)) {
				$imgData = getimagesize($rootDir .$filePath);

				if($isSmall) {
					$w = $smallWidth;
					$h = round($imgData[1] * ($w / $imgData[0] ));
					$imgData[0] = $w;
					$imgData[1] = $h;
				}

				return sprintf('<img src="%s"%s width="%s" height="%s" />', $matches[1], $matches[2], $imgData[0], $imgData[1]);
			}

			return $matches[0];
		}

		private static function autoAbbr($str) {
			return preg_replace('/[ ^]([A-Z]{2,})\((.*?)\)/', '<abbr title="$2">$1</abbr>', $str);
		}

		private static function autoDel($str) {
			return preg_replace('/(^|\n| )-(.*?)([^ ]{1,})-(\.| |\n|$)/', '$1<del>$2$3</del>$4', $str);
		}

		private static function youtubeClips($str) {
			$find = '/\<p\>\[youtube=(.*)\]\<\/p\>/';
			$replace = '
			<object type="application/x-shockwave-flash" data="http://www.youtube.com/v/$1" width="425" height="350">
				<param name="movie" value="http://www.youtube.com/v/$1" />
			</object>
			';

			return preg_replace($find, $replace, $str);
		}
	}
?>