<?php
	/*
		function getSiteFavicon($url)
		{
			return HTML_FILES_DIR ."misc/favicons/no-favicon.png"; // comment this when internet connection is available
			$favicon = "";

			if(@file_get_contents($url ."/favicon.ico"))
			{
				$favicon = $url ."/favicon.ico";
			}
			else
			{
				$subject = file_get_contents($url);
				$pattern = "/[^\"]*\.ico/i";
				$matches = array();
				
				if(preg_match($pattern, $subject, $matches))
				{
					$favicon = $matches[0];
				}
				else
				{
					$favicon = HTML_FILES_DIR ."misc/favicons/no-favicon.png";
				}
			}

			$favicon = str_replace('http:/', 'http://', preg_replace('/\/+/', '/', $favicon));

			return $favicon;
		}
	*/

	require_once(str_replace("//", "/", $_SERVER['DOCUMENT_ROOT'] ."/") ."__core/Config.php");

	// Gets a site's favicon from cache, or if not in cache, from server
	$url = (isset($_GET['url'])) ? str_replace(array("..\\", "../"), "", $_GET['url']) : "www.exscale.se";

	if($url)
	{
		$fi = FILES_DIR ."misc/favicons/" .$url .".ico";
		
		// If not in cache
		if(!file_exists($fi))
		{
			echo "$fi not in cache, starting search<br />";

			$rootIco = @file_get_contents($url ."/favicon.ico");

			// Check in root
			if($rootIco)
			{
				echo "Favicon in root dir, saving to disk<br />";

				file_put_contents(FILES_DIR ."misc/favicons/" .$url .".ico", $rootIco);
			}
			// Search for it
			else
			{
				echo "Favicon not in root, parsing index-file for ico-linking<br />";

				$subject = @file_get_contents($url);
				$pattern = "/[^\"]*\.ico/i";
				$matches = array();
				
				if(preg_match($pattern, $subject, $matches))
				{
					echo "Favicon found in code, check that " .str_replace("//", "/", $url .$matches[0]) ." really exists<br />";

					$codeIco = @file_get_contents(str_replace("//", "/", "http://" .$url .$matches[0]));

					if($codeIco)
					{
						echo "Favicon found in code, saving to disk<br />";

						$ext = end(explode(".", $matches[0]));

						file_put_contents(FILES_DIR ."misc/favicons/" .$url ."." .$ext, $codeIco);
					}
					// There is no favicon
					else
					{
						echo "No favicon found, saving the no-favicon one<br />";

						copy(FILES_DIR ."misc/favicons/no-favicon.png", FILES_DIR ."misc/favicons/" .$url .".png");
					}
				}
				// There is no favicon
				else
				{
					echo "No favicon found, saving the no-favicon one<br />";

					copy(FILES_DIR ."misc/favicons/no-favicon.png", FILES_DIR ."misc/favicons/" .$url .".png");
				}
			}
		}

		die();

		// Display it
		$ext = end(explode(".", $fi));

		switch($ext)
		{
			case "ico" : 
				header("Content-type: image/ico");
				break;
			case "jpg" : 
				header("Content-type: image/ico");
				break;
			case "png" : 
				header("Content-type: image/ico");
				break;
			case "gif" : 
				header("Content-type: image/ico");
				break;
			case "bmp" : 
				header("Content-type: image/ico");
				break;
		}
		readfile($fi);
	}
?>