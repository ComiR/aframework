<?php /* <?xml version="1.0" encoding="utf-8"?> */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="<?php echo CURRENT_LANG; ?>">

	<head>

		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<meta http-equiv="Content-Style-Type" content="text/css" />

		<meta name="author" content="<?php echo escHTML(Config::get('general.site_author')); ?>" />
		<meta name="copyright" content="Copyright (c) <?php echo date('Y') . ' ' . escHTML(Config::get('general.site_author')); ?>" />
		<meta name="keywords" content="<?php echo $meta_keywords; ?>" />
		<meta name="description" content="<?php echo $meta_description; ?>" />
		<meta name="robots" content="<?php echo $noindex ? 'noindex' : 'all'; ?>" />

		<?php if ($canonical_url) { ?>
			<link rel="canonical" href="<?php echo $canonical_url; ?>" />
		<?php } ?>

		<link rel="alternate" type="application/rss+xml" title="<?php echo escHTML(Config::get('general.site_title')); ?> Articles" href="<?php echo Router::urlForModule('Articles'); ?>&amp;rss=1" />
		<!--<link rel="shortcut icon" type="image/ico" href="<?php echo WEBROOT; ?>favicon.ico" />-->

		<?php
			if (!NAKED_DAY) {
				$ieStyleSupport 	= Config::get('general.ie_style_support');
				$linkBlock			= '<link rel="stylesheet" type="text/css" media="screen,projection" href="' . WEBROOT . (USE_MOD_REWRITE ? CURRENT_SITE . '/' . $style . '.css' : Router::urlForModule('CodeCompressor') . '&amp;s=' . $style . '&amp;t=css') . '" />';
				$universalLinkBlock	= '<link rel="stylesheet" type="text/css" media="screen,projection" href="http://universal-ie6-css.googlecode.com/files/ie6.0.3.css" />';

				if ($ieStyleSupport === true) {
					echo $linkBlock;
				}
				elseif ($ieStyleSupport === false) {
					echo "<!--[if !IE]><!-->$linkBlock<!--<![endif]-->";
					echo "<!--[if IE]>$universalLinkBlock<![endif]-->";
				}
				else {
					echo "<!--[if gte IE {$ieStyleSupport}]><!-->$linkBlock<!--<![endif]-->";
					echo "<!--[if lt IE {$ieStyleSupport}]>$universalLinkBlock<![endif]-->";
				}
			}
		?>

		<title><?php echo $html_title; ?> - <?php echo escHTML(Config::get('general.site_title')); ?></title>

	</head>

	<body id="<?php echo $body_id; ?>-page" class="js-disabled <?php echo $time_body_class; ?> <?php echo $weather_body_class; ?> <?php echo ADMIN ? 'admin' : 'not-admin'; ?> <?php echo 'lang-' . CURRENT_LANG; ?><?php echo CONTROLLER_ADMIN ? ' controller-admin' : ''; ?>">

		<script type="text/javascript">
			document.body.className	= document.body.className.replace('js-disabled', 'js-enabled');
			WEBROOT					= '<?php echo WEBROOT; ?>';
			DEFAULT_LANG			= '<?php echo Config::get('general.default_lang'); ?>';
			CURRENT_LANG			= '<?php echo CURRENT_LANG; ?>';
		</script>

		<?php
			$ieStyleSupport		= Config::get('general.ie_style_support');
			$str				= 'Your browser doesn\'t support the modern CSS used on this web page, therefore it is served with <a href="http://forabeautifulweb.com/blog/about/universal_internet_explorer_6_css/">the universal IE6 stylesheet</a>. For a richer browsing experience, please consider upgrading to <a href="http://www.getfirefox.com">a better, modern browser</a>.';

			if ($ieStyleSupport === false) {
				echo "<!--[if IE]><p>$str</p><![endif]-->";
			}
			elseif ($ieStyleSupport !== true) {
				echo "<!--[if lt IE $ieStyleSupport]><p>$str</p><![endif]-->";
			}
		?>

		<noscript>

			<p>You're really missing out coming here with <abbr title="JavaScript">JS</abbr> disabled. Everything still works but it's so much nicer with JS enabled.<!-- If you <em>had</em> JS enabled and also "ajax-mode" enabled, <a href="?ajax_mode=0">click here to disable it</a>.--></p>

		</noscript>

		<?php if (NAKED_DAY) { ?>
			<p>Today it's CSS naked day, that's why I'm all naked. I've also taken the liberty of disabling JavaScript - I believe it's equally important to do accessible JS.</p>

			<p>To learn more about naked day visit the <a href="http://naked.dustindiaz.com" title="Web Standards Naked Day Host Website">Annual CSS Naked Day</a> website.</p>
		<?php } ?>

		<?php echo $child_modules; ?>

		<?php
			if (!NAKED_DAY) {
				$ieScriptSupport	= Config::get('general.ie_script_support');

				if ($ieScriptSupport === false) {
					$ie_script_support_before	= '<!--[if !IE]><!-->';
					$ie_script_support_after	= '<!--<![endif]-->';
				}
				elseif ($ieScriptSupport !== true) {
					$ie_script_support_before	= "<!--[if gte IE $ieScriptSupport]><!-->";
					$ie_script_support_after	= '<!--<![endif]-->';
				}

				echo $ie_script_support_before . '<script type="text/javascript" src="' . WEBROOT . (USE_MOD_REWRITE ? CURRENT_SITE . '/' . $style . '.js' : Router::urlForModule('CodeCompressor') . '&amp;s=' . $style . '&amp;t=js') .'"></script>' . $ie_script_support_after;

				if ($scripts) {
					echo "$ie_script_support_before<script type=\"text/javascript\">$scripts</script>$ie_script_support_after";
				}
			}
		?>

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

	</body>

</html>
