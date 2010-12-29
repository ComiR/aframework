<?php
	$latest_news_expanded = array(
		'posts' => get_posts('numberposts=5&offset=0&category_name=News')
	);
?>

<div id="latest-news-expanded">

	<div class="inner">

		<h2>News and Press</h2>

		<ul>
			<?php foreach ($latest_news_expanded['posts'] as $post) { ?>
				<li>
					<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
					<a href="<?php the_permalink(); ?>"><?php echo substr(strip_tags($post->post_content), 0, 50); ?>...</a>
				</li>
			<?php } ?>
		</ul>

		<p><a href="<?php echo get_category_link(6); ?>">More news</a></p>

	</div>

</div>
