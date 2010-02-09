<?php
	header('Content-type: text/plain; charset=utf-8');

	require_once '../Core/Lang.php';

	if (isset($_GET['site'])) {
		$site = basename($_GET['site']);
	}
	else {
		die('Error: Please specify a site (?site=)');
	}

	$requestedLang		= isset($_GET['lang']) ? $_GET['lang'] : 'en';
	$requestedPath		= "../../$site/Lang/$requestedLang.php";
	$requestedExists	= file_exists($requestedPath);
	$allLangs			= Lang::getLangsInDir('../../' . $site);
	$usedLangs			= array();
	$requestedLang		= $requestedExists ? include $requestedPath : array();
	$code				= "<?php return array(\n";

	foreach ($allLangs as $file => $strings) {
		$code .= "\n# $file\n";

		foreach ($strings as $k => $v) {
			if (!in_array($k, $usedLangs)) {
				$usedLangs[] = $k;

				if (substr($v, 0, 4) == 'url.') {
					$v = substr($v, 4);
				}

				# Translate to requested lang
				$v = isset($requestedLang[$k]) ? $requestedLang[$k] : $v;

				$code .= "'$k' => '$v', \n";
			}
		}
	}

	echo substr($code, 0, -3) . "\n\n); ?>";
?>
