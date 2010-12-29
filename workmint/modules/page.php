<div id="page">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<?php
			# Handle page redirects (has to happen inside "the loop" :/)
			# About => About > What we do > Concept
			if ($post->ID == 2) {
				header('Location: ' . get_page_link(86), true, 301);
			}
			# About > What we do => About > What we do > Concept
			if ($post->ID == 105) {
				header('Location: ' . get_page_link(86), true, 301);
			}
			# About > Who we are => About > Who we are > People behind Workmint
			if ($post->ID == 109) {
				header('Location: ' . get_page_link(90), true, 301);
			}
			# About > Press & Media => News
			if ($post->ID == 152) {
				header('Location: ' . get_category_link(6), true, 301);
			}
			# About > Press & Media > News => News
			if ($post->ID == 154) {
				header('Location: ' . get_category_link(6), true, 301);
			}

			# Services & Solutions => Services & Solutions > Why Workmint?
			if ($post->ID == 4) {
				header('Location: ' . get_page_link(61), true, 301);
			}

			# Contact => Contact > Office
			if ($post->ID == 8) {
				header('Location: ' . get_page_link(78), true, 301);
			}
		?>

		<?php the_content(); ?>
	<?php endwhile; endif; ?>

</div>
