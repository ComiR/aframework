<?php
	# Not part of class
	$thumb = new Thumb(@$_GET['f'], @$_GET['q'], @$_GET['w']);
	$thumb->show();

	/**
	 * Creates and shows a thumbnail
	 *
	 * @class Thumb
	 */
	class Thumb {
		private $img;
		private $ext;
		private $quality;
		private $width;

		/**
		 * Sets image source, quality, extension and width
		 *
		 * @method __contruct
		 * @param {String} $f the image file
		 * @param {Int} $w the required width of the thumb
		 * @param {Int} $q the required quality (0 - 100)
		 */
		public function __construct($f, $w, $q) {
			$this->img = str_replace('//', '/', $_SERVER['DOCUMENT_ROOT'] .'/') .$f;

			if(is_file($this->img)) {
				$this->ext = end(explode('.', $f));
				$this->quality = (is_numeric($q) and $q > 0) ? $q : 50;
				$this->width = (is_numeric($w) and $w > 0) ? $w : 100;

				if($this->ext == 'jpeg') {
					$this->ext = 'jpg';
				}
			}
		}

		/**
		 * Shows the thumb
		 *
		 * @method show
		 */
		public function show() {
			# Set the right content-type
			$contentTypes = array(
				'jpg' => 'image/jpeg', 
				'gif' => 'image/gif', 
				'png' => 'image/png'
			);
			header('Content-Type: ' .$contentTypes[$this->ext]);

			# Calculate old and new width
			list($srcWidth, $srcHeight) = getimagesize($this->img);
			$newWidth = $this->width;
			$newHeight = $srcHeight * ($newWidth / $srcWidth);

			# Just read file if source width is less or equal to new width
			if($srcWidth <= $newWidth) {
				readfile($this->img);
			}

			# Now resize and show image
			switch($this->ext) {
				case 'jpg':
					$srcImg = imagecreatefromjpeg($this->img);
					$thumb = imagecreatetruecolor($newWidth, $newHeight);
			
					imagecopyresampled($thumb, $srcImg, 0, 0, 0, 0, $newWidth, $newHeight, $srcWidth, $srcHeight);

					imagejpeg($thumb, null, $this->quality);
					break;
				case 'gif':
					readfile($this->img);
					break;
				case 'png':
					readfile($this->img);
					break;
			}
		}
	}
?>