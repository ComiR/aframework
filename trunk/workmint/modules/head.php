<?php ob_start(); ?>
<!DOCTYPE html>

<html>

	<head>

		<meta charset="UTF-8"/>
		<meta name="author" content="Workmint"/>
		<meta name="copyright" content="Copyright (c) Workmint"/>

		<?php if (isset($_GET['print'])) { ?>
			<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/print.css"/>
		<?php } else { ?>
			<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/all.php" media="screen,projection"/>
			<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/print.css" media="print"/>
		<?php } ?>
		<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

		<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>

	</head>

	<body id="<?php
		if(is_home())			echo 'home';
		elseif(is_single())		echo 'article';
		elseif(is_archive())	echo 'archives';
		elseif(is_page())		echo 'page';
		elseif(is_search())		echo 'search-results';
	?>-page" class="js-disabled page-<?php echo strtolower(preg_replace('/[^a-zA-Z0-9-_]/', '', wp_title('', false))); ?>">

		<script type="text/javascript">
			document.body.className	= document.body.className.replace('js-disabled', 'js-enabled');
			TEMPLATE_PATH ='<?php bloginfo('template_directory'); ?>';
		</script>

		<div style="display: none; position: absolute; left: -35px; top: -132px; z-index: 1; opacity: .5;"><img src="<?php bloginfo('template_directory'); ?>/skiss.png" alt=""/></div>

		<div id="wrapper">
