<?php
	session_start();

	Captcha::show(4, '..//Files/fonts/catholic-school-girls.ttf');

	class Captcha {
		public static function show ($len = 4, $font = '') {
			header('Content-type: image/png');

			$str					= self::genStr($len); 
			$_SESSION['captcha']	= md5($str);
			$image					= imagecreate(60, 30);
			$backgroundColor		= imagecolorallocate($image, 255, 255, 255);
			$color					= imagecolorallocate($image, 11, 22, 33);

			imagettftext($image, 20, 0, 5, 20, $color, $font, $str);
			imagepng($image);
			imagedestroy($image);
		}

		private static function genStr ($len = 4) {
			$chars	= 'abcdefghijklmnopqrstuvwxyz';
			$word	= '';

			for ($i = 0; $i < $len; $i++) {
				$word .= substr($chars, rand(0, strlen($chars) -1), 1);
			}

			return $word;
		}
	}
?>
