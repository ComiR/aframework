<?php
	$cta_box = array(
		'posts' => get_posts('numberposts=3&offset=0&category_name=CTA')
	);
?>

<div id="cta-box">

	<div id="cta-box-inner">

		<?php foreach ($cta_box['posts'] as $post) { ?>
			<div class="cta">

				<?php echo $post->post_content; ?>

			</div>
		<?php } ?>

	</div>

</div>
