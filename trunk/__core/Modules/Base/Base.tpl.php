<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

	<head>

		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="robots" content="all" />

		<link rel="alternate" type="application/rss+xml" title="<?php echo $_TPLVARS['base']['site_title']; ?> Articles" href="/rss.xml" />
		<link rel="shortcut icon" type="image/ico" href="/__styles/favicon.ico" />

		<link rel="stylesheet" type="text/css" media="screen,projection" href="/__styles/<?php echo $_TPLVARS['style']; ?>/all.css" />

		<title><?php echo $_TPLVARS['base']['html_title']; ?> - <?php echo $_TPLVARS['base']['site_title']; ?></title>

	</head>

	<body id="<?php echo $_TPLVARS['base']['body_id']; ?>-page" class="js-disabled">

		<!--[if IE]>
			<div id="ie-warning">

				<p>Your browser is outdated and unsafe. For a richer browsing experience, please consider upgrading to a <a href="http://www.getfirefox.com">better, modern browser</a>.</p>

			</div>

			<hr />
		<![endif]-->

		<noscript>

			<p>You're really missing out coming here with <abbr title="JavaScript">JS</abbr> disabled.</p>

		</noscript>

		<?php echo $_TPLVARS['child_modules']; ?>

		<script type="text/javascript" src="/__js/all.js"></script>

		<!--<script type="text/javascript" src="http://www.google-analytics.com/urchin.js"></script>
		<script type="text/javascript">
			_uacct = "UA-1823084-1";
			urchinTracker();
		</script>-->

	</body>

</html>