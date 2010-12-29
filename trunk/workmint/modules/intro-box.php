<?php
	$intro_box = array(
		'posts' => get_posts('category_name=Intro')
	);
?>

<div id="intro-box">

	<?php $i = 1; foreach ($intro_box['posts'] as $post) { ?>
		<div id="intro-box-<?php echo $i; ?>">

			<?php echo $post->post_content; ?>

		</div>
	<?php $i++; } ?>

	<ul class="navigation">
		<?php $i = 1; foreach ($intro_box['posts'] as $post) { ?>
			<li><a href="#intro-box-<?php echo $i; ?>"><?php the_title(); ?></a></li>
		<?php $i++; } ?>
	</ul>

</div>
