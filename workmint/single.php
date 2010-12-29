<?php include 'modules/head.php'; ?>

<div id="top">
	<div id="top-inner">

		<?php include 'modules/header.php'; ?>
		<?php include 'modules/navigation.php'; ?>
		<?php include 'modules/login.php'; ?>

	</div>
</div>

<div id="content">

	<?php include 'modules/twitter-feed.php'; ?>
	<?php include 'modules/social-navigation.php'; ?>
	<?php include 'modules/breadcrumbs.php'; ?>

	<div id="primary-content">

		<?php include 'modules/article.php'; ?>
		<?php
			if (have_posts()) {
				comments_template($file = '/modules/comments.php');
				if ('open' == $post->comment_status)
					include TEMPLATEPATH . '/modules/post-comment.php';
			}
		?>

	</div>

	<div id="secondary-content">

		<?php include 'modules/latest-news-expanded.php'; ?>

	</div>

	<?php include 'modules/cta-box.php'; ?>

</div>

<div id="bottom">
	<div id="bottom-inner">

		<?php include 'modules/workmint-navigation.php'; ?>
		<?php include 'modules/helpdesk-navigation.php'; ?>
		<?php include 'modules/latest-news.php'; ?>
		<?php include 'modules/latest-tweets.php'; ?>
		<?php include 'modules/quick-contact.php'; ?>

	</div>
</div>

<?php include 'modules/foot.php'; ?>
