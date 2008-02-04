<?php
	require_once(str_replace("//", "/", $_SERVER['DOCUMENT_ROOT'] ."/") ."__core/Config.php");
	$fonts_dir = FILES_DIR ."misc/fonts/";

	function hexrgb($hexstr)
	{
		$int = hexdec($hexstr);

		return array("r" => 0xFF & ($int >> 0x10), "g" => 0xFF & ($int >> 0x8), "b" => 0xFF & $int);
	}

	$font_color	= (isset($_GET['color'])) ? hexrgb($_GET['color']) : hexrgb("000000");
	$font_color	= (isset($_GET['color_r']) and isset($_GET['color_g']) and isset($_GET['color_b'])) ? array("r" => $_GET['color_r'], "g" => $_GET['color_g'], "b" => $_GET['color_b']) : $font_color;
	$bg_color	= (isset($_GET['bg'])) ? hexrgb($_GET['bg']) : hexrgb("ffffff");
	$bg_color	= (isset($_GET['bg_r']) and isset($_GET['bg_g']) and isset($_GET['bg_b'])) ? array("r" => $_GET['bg_r'], "g" => $_GET['bg_g'], "b" => $_GET['bg_b']) : $bg_color;
	$size		= (isset($_GET['size'])) ? intval($_GET['size']) : 32;
	$font		= (isset($_GET['font']) and is_file($fonts_dir .$_GET['font'])) ? $fonts_dir .$_GET['font'] : "$fonts_dir/ASENINE_.ttf";
	$width		= (isset($_GET['width']) and is_numeric($_GET['width'])) ? $_GET['width'] : "500";
	$height		= (isset($_GET['height']) and is_numeric($_GET['height'])) ? $_GET['height'] : "50";
	$str		= (isset($_GET['str'])) ? $_GET['str'] : "No string specified";
	$y			= $size + ($height - $size) / 2;
	$im			= imagecreate($width, $height);
	$bg			= imagecolorallocate($im, $bg_color['r'], $bg_color['g'], $bg_color['b']);
	$color		= imagecolorallocate($im, $font_color['r'], $font_color['g'], $font_color['b']);

	header("Content-type: image/png");

	imagettftext($im, $size, 0, 0, $y, $color, $font, $str);
	imagepng($im);
	imagedestroy($im);
?>