<?php
	# Function version of class (cus it's handier)
	function ns($str, $cutMore = false, $substr = false, $markdownHeadingLevel = false, $allowHTMLBlocks = false) {
		$ns = new NiceString($str);

		# If $cutMore is an array it is treated as the options-array, otherwise an options-array is built from the arguments (for backwards-compatibility)
		$options = (is_array($cutMore)) ? $cutMore : array('cut_more' => $cutMore, 'substr' => $substr, 'markdown_heading_level' => $markdownHeadingLevel, 'allow_html_blocks' => $allowHTMLBlocks);
		$ns->setOptions($options);

		return $ns->makeNice();
	}

	/**
	 * Turns $str into valid xhtml 1 strict ready for output
	 * also does a lot of other stuff but dig into the class to see that
	 *
	 * @class NiceString
	 */
	class NiceString {
		private $str;
		private $cutMore = false;
		private $substr = false;
		private $markdownHeadingLevel = false;
		private $allowHTMLBlocks = false;
		private $htmlBlocks = array();
		private $codeBlocks = array();

		/**
		 * Sets $str's value
		 *
		 * @method __constrcut
		 */
		public function __construct($str) {
			$this->str = $str;
		}

		public function setStr($str) {
			$this->str = $str;
		}

		public function getStr() {
			return $this->str;
		}

		public function setOptions($options) {
			if(is_array($options)) {
				$this->cutMore = @$options['cut_more'];
				$this->substr = @$options['substr'];
				$this->markdownHeadingLevel = @$options['markdown_heading_level'];
				$this->allowHTMLBlocks = @$options['allow_html_blocks'];
			}
		}

		/**
		 * Runs all the other private methods and returns nice string
		 *
		 * @method makeNice
		 */
		public function makeNice() {
			$this->convertLinebreaks();
			$this->substrCut();
			if($this->allowHTMLBlocks) {
				$this->extractHTMLBlocks();
			}
			$this->extractCodeBlocks();
			$this->deleteComments();
			$this->moreCut();
			$this->replaceMarkdownBlockquotes();
			$this->stripHTML();
			$this->reverseMarkdownBlockquotes();
			$this->fixMarkdownHeadingLevels();
			$this->runMarkdown();
			$this->fixImgWidthHeightAttrs();
			$this->autoAbbr();
			$this->autoDel();
			$this->youtubeClips();
			if($this->allowHTMLBlocks) {
				$this->insertHTMLBlocks();
			}
			$this->insertCodeBlocks();

			return $this->str;
		}

		/**
		 *
		 *
		 * @method 
		 */
		private function convertLinebreaks() {
			$this->str = str_replace(array("\n\r","\r\n","\r"), "\n", $this->str);
		}

		/**
		 *
		 *
		 * @method 
		 */
		private function substrCut() {
			if($this->substr and strlen($this->str) > ($this->substr + 3)) {
				$this->str = substr($this->str, 0, $this->substr) .'...';
			}
		}

		/**
		 * Extracts all html-blocks from string
		 *
		 * @method extractHTMLBlocks
		 */
		private function extractHTMLBlocks() {
			if(substr_count($this->str, '/[xhtml]/') != substr_count($this->str, '/[\/xhtml]/')) {
				$this->str .= '[/xhtml]';
			}

			$pattern = '/\[xhtml\](.+?)\[\/xhtml\]/is';

			preg_match_all($pattern, $this->str, $this->htmlBlocks);
			$this->str = preg_replace($pattern, "\n\n[EXHTMLBLOCK]\n\n", $this->str);
		}

		/**
		 * Extracts all code-blocks from string
		 *
		 * @method extractCodeBlocks
		 */
		private function extractCodeBlocks() {
			if(substr_count($this->str, '/[code]/') != substr_count($this->str, '/[\/code]/')) {
				$this->str .= '[/code]';
			}

			$pattern = '/\[code\](.+?)\[\/code\]/is';

			preg_match_all($pattern, $this->str, $this->codeBlocks);
			$this->str = preg_replace($pattern, "\n\n[EXCODEBLOCK]\n\n", $this->str);

			$inlineStyles = array('<span style="color: #000000">', '<span style="color: #FF8000">', '<span style="color: #007700">', '<span style="color: #0000BB">', '<span style="color: #DD0000">');
			$semanticClasses = array('<span>', '<span class="comment">', '<span class="keyword">', '<span class="var">', '<span class="string">');
			$phpTags = array('<span class="var">&lt;?php<br /></span>', '<span class="var">&lt;?php</span>', '&lt;?php', '<span class="var"><br />?&gt;</span>', '<span class="var">?&gt;</span>', '?&gt;');

			for($i=0; $i<count($this->codeBlocks[1]); $i++)
			{
				$hasPHPTags = true;

				if(substr($this->codeBlocks[1][$i], 0, 1) == "\n") {
					$this->codeBlocks[1][$i] = substr($this->codeBlocks[1][$i], 1);
				}
				if(substr($this->codeBlocks[1][$i], -1, 1) == "\n") {
					$this->codeBlocks[1][$i] = substr($this->codeBlocks[1][$i], 0, -1);
				}

				if(!stristr($this->codeBlocks[1][$i], '<?php')) {
					$hasPHPTags = false;
					$this->codeBlocks[1][$i] = "<?php\n" .$this->codeBlocks[1][$i] ."\n?>";
				}

				$this->codeBlocks[1][$i] = "<p class=\"code-block\">\n\n" .highlight_string($this->codeBlocks[1][$i], true) ."\n\n</p>";

				$this->codeBlocks[1][$i] = str_replace($inlineStyles, $semanticClasses, $this->codeBlocks[1][$i]);

				if(!$hasPHPTags) {
					$this->codeBlocks[1][$i] = str_replace($phpTags, '', $this->codeBlocks[1][$i]);
				}
			}
		}

		/**
		 * Reinserts all the HTML blocks in the string
		 *
		 * @method insertHTMLBlocks
		 */
		private function insertHTMLBlocks() {
			foreach($this->htmlBlocks[1] as $hbm) {
				$this->str = $this->str_replace_once("<p>[EXHTMLBLOCK]</p>", $hbm, $this->str);
			}
		}

		/**
		 * Reinserts all the code-blocks in the string
		 *
		 * @method insertCodeBlocks
		 */
		private function insertCodeBlocks() {
			foreach($this->codeBlocks[1] as $cbm) {
				$this->str = $this->str_replace_once("<p>[EXCODEBLOCK]</p>", $cbm, $this->str);
			}
		}

		# Helper... (also in Functions.php)
		private function str_replace_once($needle, $replace, $haystack) {
			if($pos = strpos($haystack, $needle)) {
				return substr_replace($haystack, $replace, $pos, strlen($needle));
			}
			return $haystack;
		}

		/**
		 * 
		 *
		 * @method deleteComments
		 */
		private function deleteComments() {
			$this->str = preg_replace('/\[del\].*?\[\/del\]/is', '', $this->str);
		}

		/**
		 * 
		 *
		 * @method moreCut
		 */
		private function moreCut() {
			if($this->cutMore) {
				$morePos = strpos($this->str, '[more]');

				if($morePos !== false) {
					$this->str = substr($this->str, 0, $morePos);
				}
			}
			else {
				$this->str = str_replace('[more]', '', $this->str);
			}
		}

		/**
		 * 
		 *
		 * @method replaceMarkdownBlockquotes
		 */
		private function replaceMarkdownBlockquotes() {
			$this->str = preg_replace('/(^|\n)>(.*)/', '$1]$2', $this->str);
		}

		/**
		 * 
		 *
		 * @method stripHTML
		 */
		private function stripHTML() {
			$this->str = htmlentities($this->str);
		}

		/**
		 * 
		 *
		 * @method reverseMarkdownBlockquotes
		 */
		private function reverseMarkdownBlockquotes() {
			$this->str = preg_replace('/(^|\n)\](.*)/', '$1>$2', $this->str);
		}

		/**
		 * 
		 *
		 * @method fixMarkdownHeadingLevels
		 */
		private function fixMarkdownHeadingLevels() {
			$level = $this->markdownHeadingLevel;
			if($level > 0 and $level < 7) {
				# Find the highest heading level in the string
				$levels = array();
				for($highestLevel=1; $highestLevel<7; $highestLevel++) {
					$match = '/(^|\n)#{' .$highestLevel .',' .$highestLevel .'} {0,}[^#]*($|\n)/';
					if(preg_match($match, $this->str)) {
						break;
					}
				}
				# If the highest level is higher (less #) than ours, add x # to each heading
				if($highestLevel < $level) {
					$diff		= $level - $highestLevel;
					$find		= '/(^|\n)(#+)( {0,})([^$\n]*)/';
					$replace	= '$1$2' .str_repeat('#', $diff) .'$3$4';
					$this->str	= preg_replace($find, $replace, $this->str);
				}
				# If the $str's highest level is lower (more #) than ours, subtract X # to all headings
				elseif($highestLevel > $level) {
					$diff		= $highestLevel - $level;
					$find		= '/(^|\n)(#+)( {0,})([^$\n]*)/e';
					$replace	= "'$1' .substr(\"$2\", 0, strlen(\"$2\")-$diff) .'$3$4'";
					$this->str	= preg_replace($find, $replace, $this->str);
				}
				# else - The string is already gtg
			}
		}

		/**
		 * 
		 *
		 * @method runMarkdown
		 */
		private function runMarkdown() {
			$this->str = markdown($this->str);
		}

		/**
		 * 
		 *
		 * @method fixImgWidthHeightAttrs
		 */
		private function fixImgWidthHeightAttrs() {
			$this->str = preg_replace_callback('/<img src="(.*?)"(.*?) \/>/', array($this, 'fixImgWidthHeightAttrsCallback'), $this->str);
		}

		private function fixImgWidthHeightAttrsCallback($matches) {
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

		/**
		 * 
		 *
		 * @method autoAbbr
		 */
		private function autoAbbr() {
			$this->str = preg_replace('/([A-Z]{2,})\(([^\)]*)\)/', '<abbr title="$2">$1</abbr>', $this->str);
		}

		/**
		 * 
		 *
		 * @method autoDel
		 */
		private function autoDel() {
			$this->str = preg_replace('/(^|\n| )-(.*?)([^ ]{1,})-(\.| |\n|$)/', '$1<del>$2$3</del>$4', $this->str);
		}

		/**
		 * 
		 *
		 * @method youtubeClips
		 */
		private function youtubeClips() {
			$find = '/\<p\>\[youtube=(.*)\]\<\/p\>/';
			$replace = '
			<object type="application/x-shockwave-flash" data="http://www.youtube.com/v/$1" width="425" height="350">
				<param name="movie" value="http://www.youtube.com/v/$1" />
			</object>
			';
			$this->str = preg_replace($find, $replace, $this->str);
		}
	}
?>