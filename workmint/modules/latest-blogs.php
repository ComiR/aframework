<?php
	$latest_blogs = array(
		'posts' => get_posts('numberposts=5&offset=0&category_name=Blog')
	);
?>

<div id="latest-blogs">

	<h2>Latest Blogs</h2>

	<ul>
		<?php foreach ($latest_blogs['posts'] as $post) { ?>
			<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
		<?php } ?>
	</ul>

</div>
