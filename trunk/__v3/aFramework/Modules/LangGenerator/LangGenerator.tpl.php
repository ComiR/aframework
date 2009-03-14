<?php
	$code	= "<?php return array(\n";

	foreach ($langs as $site => $ls) {
		$code .= "\n# $site\n";

		foreach ($ls as $k => $v) {
			$code .= "'$k' => '$v', \n";
		}
	}

	echo substr($code, 0, -3) . "\n\n); ?>"; 
?>