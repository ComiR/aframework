<?php
	class OurFutureEU_DocumentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['delete_document']) and ADMIN) {
				self::deleteDocument($_POST['delete_document']);
			}
			if (isset($_POST['upload_document']) and ADMIN) {
				self::uploadDocument();
			}

			self::showTheDocuments();
		}

		private static function showTheDocuments () {
			if (!isset(Router::$params['url_str'])) {
				return self::$tplFile = false;
			}

			$docs		= array();
			$pageName	= str_replace(array('å', 'ä', 'ö'), array('a', 'a', 'o'), Router::$params['url_str']);
			$docDir		= Router::urlForFile("documents/$pageName/", 'OurFutureEU', DOCROOT);
			$docPath	= Router::urlForFile("documents/$pageName/", 'OurFutureEU', WEBROOT);

			if (!is_dir($docDir)) {
				return self::$tplFile = false;
			}

			$dirHandler	= opendir($docDir);

			while ($doc = readdir($dirHandler)) {
				if (!in_array($doc, array('..', '.')) and is_file($docDir . $doc)) {
					$ext = end(explode('.', $doc));

					$docs[] = array(
						'name'	=> $doc, 
						'ext'	=> $ext, 
						'title'	=> substr(ucwords(str_replace(array('-', '_'), ' ', $doc)), 0, -(strlen($ext) + 1)), 
						'size'	=> filesize($docDir . $doc), 
						'dir'	=> $docDir . $doc, 
						'path'	=> $docPath . $doc
					);
				}
			}

			self::$tplVars['documents'] = $docs;
		}

		private static function deleteDocument ($path) {
			if (file_exists($path)) {
				unlink($path);

				if (!XHR) {
					redirect(msg('Deleted Document', 'The document was successfully deleted.'));
				}
			}
		}

		private static function uploadDocument () {
			$name = strtolower(preg_replace('/[^a-zA-Z0-9\.\-_]*/', '', $_FILES['doc']['name']));
			$path = Router::urlForFile('documents/' . Router::$params['url_str'] . '/' . $name, 'OurFutureEU', DOCROOT);

			if (move_uploaded_file($_FILES['doc']['tmp_name'], $path)) {
				redirect(msg('Uploaded Document', 'The document was successfully uploaded.'));
			}
			else {
				redirect(msg('Error Uploading Document', 'An error occurred while uploading the document. Please try again.', true));
			}			
		}
	}
?>
