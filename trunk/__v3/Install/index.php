<?php
	error_reporting(E_ALL);
	ini_set('display_errors', true);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

	<head>

		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />

		<link rel="stylesheet" type="text/css" media="screen,projection" href="css/all.php" />

		<title>aFramework Installation Wizard</title>

	</head>

	<body id="home-page" class="js-disabled">

		<script type="text/javascript">
			document.body.className = 'js-enabled';
			var WEBROOT = '/';
		</script>

		<div id="wrapper-a"><div id="wrapper-b"><div id="wrapper-c">

			<div id="header">

				<h1><a href="/">aFramework</a></h1>

				<p>Installation Wizard</p>

			</div>

			<div id="content">

				<?php
					include 'mod/AframeworkInstall.php';
				?>

			</div>

			<div id="footer">

				<p>&copy; aFramework and <a href="http://andreaslagerkvist.com">Andreas Lagerkvist</a>. <a href="http://creativecommons.org/licenses/by/3.0/" title="All articles, content, scripts, images, etc are released under a CCv3">Some Rights Reserved</a>.</p>

			</div>

		</div></div></div>

		<script type="text/javascript" src="js/all.php"></script>

	</body>

</html>
