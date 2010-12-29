<?php
	$latest_news = array(
		'posts' => get_posts('numberposts=5&offset=0&category_name=News')
	);
?>

<div id="latest-news">

	<h2>Press News</h2>

	<ul>
		<?php foreach ($latest_news['posts'] as $post) { ?>
			<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
		<?php } ?>
	</ul>

</div>
