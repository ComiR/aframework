<?php
	class PixasticOptionsGenerator {
		private static $actionsURL = 'http://www.pixastic.com/lib/docs/actions/';

		public static function run () {
			$actions = self::grabActions();
			$options = array();

			foreach ($actions as $action) {
				$options[$action] = self::grabOptionsForAction($action);
			}

			return $options;
		}

		public static function grabActions () {
			$matches	= array();
			$actions	= array();
			$contents	= file_get_contents(self::$actionsURL);
			$pattern	= '/<tr.*?href="(.*?)".*?\/tr>/';

			preg_match_all($pattern, $contents, $matches);

			foreach ($matches[1] as $potentialAction) {
				if (preg_match('/^[^\/].*?\/$/', $potentialAction)) {
					$actions[] = substr($potentialAction, 0, -1);
				}
			}

			return $actions;
		}

		public static function grabOptionsForAction ($action) {
			$matches	= array();
			$options	= array();
			$contents	= file_get_contents(self::$actionsURL . '/' . $action);
			$pattern	= '/<ul class="action-options-list">(.*?)<\/ul>/';
			$liPattern	= '/<li>(.*?)<\/li>/';
			$optPattern	= '/<span class=\'option-desc\'><span class=\'option-name\'>(.*?)<\/span>.*?\(<span class=\'option-type\'>(.*?)<\/span>\)<br\/>(.*?)<\/span>/';

			preg_match($pattern, $contents, $matches);
			preg_match_all($liPattern, $matches[1], $matches);

			foreach ($matches[1] as $option) {
				preg_match($optPattern, $option, $matches);

				$option = array(
					'key'			=> $matches[1], 
					'title'			=> ucfirst($matches[1]), 
					'description'	=> $matches[3], 
					'type'			=> $matches[2]
				);

				// Match min/max vals
				$innerMatches = array();
				if (preg_match('/(-?[0-9]+).*?[and|to].*?([0-9]+)/', $matches[3], $innerMatches)) {
					$option['min'] = $innerMatches[1];
					$option['max'] = $innerMatches[2];
				}

				// Match possible default-value (defaults to ...)
				if (preg_match('/defaults to (.*?)[ |\.|$]/i', $matches[3], $innerMatches)) {
					$option['default'] = $innerMatches[1];
				}

				$options[] = $option;
			}

			return $options;
		}
	}

	header('content-type: text/plain');

	$options = PixasticOptionsGenerator::run();

	echo 'jQueryPixasticEditorOptions = ' . json_encode($options) . ';';

	var_dump($options);
?>
