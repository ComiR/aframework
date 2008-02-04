<?php
	function hexrgb($hexstr)
	{
		$int = hexdec($hexstr);
		return array("r" => 0xFF & ($int >> 0x10), "g" => 0xFF & ($int >> 0x8), "b" => 0xFF & $int);
	}

	// Get colours to create gradient from
	$c1 = (isset($_GET['c1'])) ? $_GET['c1'] : "ff0000";
	$c2 = (isset($_GET['c2'])) ? $_GET['c2'] : "0000ff";

	// Get height (width is always 1px)
	$h = (isset($_GET['h'])) ? $_GET['h'] : 500;
	$w = 100;

	// Calculate difference between colours to determine number of steps needed
	$rgb1 = hexrgb($c1);
	$rgb2 = hexrgb($c2);
	$rgbc = $rgb1;

	// Create image
	$img = imagecreatetruecolor($w, $h);

	$increaseFactor = 1 / $h;

	// Calculate new colour for each pixel
	for($i=0; $i<$h; $i++)
	{
		// Calclate new colours
		foreach($rgbc as $k => $v)
		{
			if($rgb1[$k] > $rgb2[$k])
			{
				$rgbc[$k] -= ($rgb1[$k] - $rgb2[$k]) * $increaseFactor;
			}
			else
			{
				$rgbc[$k] += ($rgb2[$k] - $rgb1[$k]) * $increaseFactor;
			}
		}

		$colour = imagecolorallocate($img, $rgbc['r'], $rgbc['g'], $rgbc['b']);
		imagefilledrectangle($img, 0, $i, $w, $i+1, $colour);
	}
	
	// Display image
	header("Content-type: image/jpeg");
	imagejpeg($img);
	imagedestroy($img);
?>