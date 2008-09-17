<?php
	class Captcha {
		public static function show($len = 4, $font = '') {
			header('Content-type: image/png');

			$str					= self::genStr($len); 
			$_SESSION['captcha']	= md5($str);
			$image					= imagecreate(60, 30);
			$backgroundColor		= imagecolorallocate($im, 255, 255, 255);
			$fontColor				= imagecolorallocate($im, 33, 66, 99);

			imagettftext($image, 20, 0, 5, 20, $color, $font, $str);
			imagepng($image);
			imagedestroy($image);
		}

		private static function genStr($len = 4) {
			$chars	= 'abcdefghijklmnopqrstuvwxyz';
			$word	= '';

			for($i = 0; $i < $len; $i++) {
				$word .= substr($chars, rand(0, strlen($chars) -1), 1);
			}

			return $word;
		}
	}
?>