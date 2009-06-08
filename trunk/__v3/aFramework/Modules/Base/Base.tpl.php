<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

	<head>

		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />

		<meta name="author" content="<?php echo Config::get('general.site_author'); ?>" />
		<meta name="copyright" content="Copyright (c) <?php echo date('Y') . ' ' . Config::get('general.site_author'); ?>" />
		<meta name="keywords" content="<?php echo $meta_keywords; ?>" />
		<meta name="description" content="<?php echo $meta_description; ?>" />
		<meta name="robots" content="<?php echo $noindex ? 'noindex' : 'all'; ?>" />

		<link rel="alternate" type="application/rss+xml" title="<?php echo Config::get('general.site_title'); ?> Articles" href="<?php echo WEBROOT; ?>?module=Articles&amp;rss=1" />
		<link rel="shortcut icon" type="image/ico" href="<?php echo WEBROOT; ?>favicon.ico" />
		<?php if (!NAKED_DAY) { ?>
			<link rel="stylesheet" type="text/css" media="screen,projection" href="<?php echo WEBROOT; echo USE_MOD_REWRITE ? CURRENT_SITE . '/' . $style . '.css' : '?module=CodeCompressor&amp;s=' . $style . '&amp;t=css'; ?>" />
		<?php } ?>

		<title><?php echo $html_title; ?> - <?php echo Config::get('general.site_title'); ?></title>

	</head>

	<body id="<?php echo $body_id; ?>-page" class="js-disabled <?php echo $time_body_class; ?> <?php echo $weather_body_class; ?> <?php echo ADMIN ? 'admin' : 'not-admin'; ?> <?php echo DEBUG ? 'debug' : 'not-debug'; ?>">

		<script type="text/javascript">
			document.body.className = document.body.className.replace('js-disabled', 'js-enabled');
			WEBROOT = '<?php echo WEBROOT; ?>';
		</script>

		<!--[if IE]>
			<div id="ie-warning">

				<p>Your browser is outdated and unsafe. For a richer browsing experience, please consider upgrading to <a href="http://www.getfirefox.com">a better, modern browser</a>. You would also <a href="http://www.savethedevelopers.org/">help save the developers</a> :)</p>

			</div>
		<![endif]-->

		<noscript>

			<p>You're really missing out coming here with <abbr title="JavaScript">JS</abbr> disabled. Everything still works but it's so much nicer with JS enabled. If you <em>had</em> JS enabled and also "ajax-mode" enabled, <a href="?ajax_mode=0">click here to disable it</a>.</p>

		</noscript>

		<?php if (NAKED_DAY) { ?>
			<div id="naked-day-info">

				<p>Today it's CSS naked day, that's why I'm all naked. I've also taken the liberty of disabling JavaScript - I believe it's equally important to do accessible JS.</p>

				<p>To learn more about naked day visit the <a href="http://naked.dustindiaz.com" title="Web Standards Naked Day Host Website">Annual CSS Naked Day</a> website.</p>

			</div>
		<?php } ?>

		<?php echo $child_modules; ?>

		<?php if (!NAKED_DAY) { ?>
			<script type="text/javascript" src="<?php echo WEBROOT; echo USE_MOD_REWRITE ? CURRENT_SITE . '/' . $style . '.js' : '?module=CodeCompressor&amp;s=' . $style . '&amp;t=js'; ?>"></script>
		<?php } ?>

		<?php if (Config::get('general.ga_id')) { ?>
			<script type="text/javascript">
				var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
				document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
			</script>
			<script type="text/javascript">
				var pageTracker = _gat._getTracker("<?php echo Config::get('general.ga_id'); ?>");
				pageTracker._initData();
				pageTracker._trackPageview();
			</script>
		<?php } ?>

		<?php if ($scripts) { ?>
			<script type="text/javascript">
				<?php echo $scripts; ?>
			</script>
		<?php } ?>

	</body>

</html>