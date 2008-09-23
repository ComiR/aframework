<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

	<head>

		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="author" content="<?php echo SITE_AUTHOR; ?>" />
		<meta name="copyright" content="Copyright (c) <?php echo date('Y') .' ' .SITE_AUTHOR; ?>" />
		<meta name="keywords" content="<?php echo $meta_keywords; ?>" />
		<meta name="description" content="<?php echo $meta_description; ?>" />
		<meta name="robots" content="all" />

		<link rel="alternate" type="application/rss+xml" title="<?php echo SITE_TITLE; ?> Articles" href="/?mod=ArticleListing&amp;rss=1" />
		<link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
		<link rel="stylesheet" type="text/css" media="screen,projection" href="/?module=CSSCompressor&amp;s=<?php echo $style; ?>" />

		<title><?php echo $html_title; ?> - <?php echo SITE_TITLE; ?></title>

	</head>

	<body id="<?php echo $body_id; ?>-page" class="js-disabled <?php echo $time_body_class; ?> <?php echo $weather_body_class; ?> <?php echo ADMIN ? 'admin' : 'not-admin'; ?>">

		<script type="text/javascript">
			document.body.className = document.body.className.replace('js-disabled', 'js-enabled');
			WEBROOT = '<?php echo WEBROOT; ?>';
		</script>

		<!--[if IE]>
			<div id="ie-warning">

				<p>Your browser is outdated and unsafe. For a richer browsing experience, please consider upgrading to <a href="http://www.getfirefox.com">a better, modern browser</a>. You would also <a href="http://www.savethedevelopers.org/">help save the developers</a> :)</p>

			</div>

			<hr />
		<![endif]-->

		<noscript>

			<p>You're really missing out coming here with <abbr title="JavaScript">JS</abbr> disabled. Everything still works but it's so much nicer with JS enabled.</p>

		</noscript>

		<?php echo $child_modules; ?>

		<script type="text/javascript" src="/?module=JSCompressor&amp;s=<?php echo $style; ?>"></script>

		<?php if(GA_ID) { ?>
			<script type="text/javascript">
				var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
				document.write(unescape("%3Cscript src='" +gaJsHost +"google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
			</script>
			<script type="text/javascript">
				var pageTracker = _gat._getTracker("<?php echo GA_ID ?>");
				pageTracker._initData();
				pageTracker._trackPageview();
			</script>
		<?php } ?>

	</body>

</html>