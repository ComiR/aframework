<?php
	require_once '../Core/Lang.php';

	if (isset($_GET['site'])) {
		$site = $_GET['site'];
	}
	else {
		die('Error: Please specify a site (?site=)');
	}

	$langs	= Lang::getLangsInDir('../../' . basename($site));
	$code	= "<?php return array(\n";

	foreach ($langs as $site => $ls) {
		$code .= "\n# $site\n";

		foreach ($ls as $k => $v) {
			if (substr($v, 0, 4) == 'url.') {
				$v = substr($v, 4);
			}

			$code .= "'$k' => '$v', \n";
		}
	}

	echo substr($code, 0, -3) . "\n\n); ?>"; 
?>
