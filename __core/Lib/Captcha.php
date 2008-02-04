<?php
	require_once(str_replace("//", "/", $_SERVER['DOCUMENT_ROOT'] ."/") ."__core/Config.php");

	session_start();

	function make_word($len = 4)
	{
		$chars = 'abcdefghijklmnopqrstuvwxyz';
		$word = '';
		for($i=0; $i<intval($len); $i++)
		{
			$word .= substr($chars, rand(0, strlen($chars) -1), 1);
		}
		if(!empty($word)) return $word;

		return false;
	}

	$str = make_word(); 
	$_SESSION['captcha'] = md5($str);

	header("Content-type: image/png");

	$im = imagecreate(60, 30);

	$bg = imagecolorallocate($im, 255, 255, 255);
	$clr = imagecolorallocate($im, 33, 66, 99);

	$font = FILES_DIR ."misc/fonts/captcha.ttf";

	imagettftext($im, 20, 0, 5, 20, $clr, $font, $str);

	imagepng($im);
	imagedestroy($im);
?>