<?php
	session_start();
	$c = new Captcha(str_replace('//', '/', $_SERVER['DOCUMENT_ROOT'] .'/') .'__files/captcha.ttf', 4);
	$c->show();

	/**
	 * Generates a "captcha"
	 * 
	 * @class Captcha
	 */
	class Captcha {
		private $font = false;
		private $length = 4;

		public function __construct($f, $l) {
			if(file_exists($f)) {
				$this->font = $f;
			}
			if(is_numeric($l)) {
				$this->lenght = $l;
			}
		}

		public function show() {
			header('Content-type: image/png');

			$str = $this->genStr(); 
			$_SESSION['captcha'] = md5($str);
			$im = imagecreate(60, 30);
			$bg = imagecolorallocate($im, 255, 255, 255);
			$clr = imagecolorallocate($im, 33, 66, 99);

			imagettftext($im, 20, 0, 5, 20, $clr, $this->font, $str);
			imagepng($im);
			imagedestroy($im);
		}

		private function genStr() {
			$chars = 'abcdefghijklmnopqrstuvwxyz';
			$word = '';
			for($i = 0; $i < $this->length; $i++) {
				$word .= substr($chars, rand(0, strlen($chars) -1), 1);
			}
			return $word;
		}
	}
?>