<h2><?php echo Lang::get('All Images Published in Articles'); ?></h2>

<ol>
	<?php foreach ($images as $image) { ?>
		<li<?php if ($image['article']['future']) { ?> class="future"<?php } ?>>
			<h3><?php echo escHTML($image['title']); ?></h3>

			<a href="<?php echo $image['src']; ?>">
				<img src="<?php echo $image['src_thumb']; ?>" alt=""/>
			</a>

			<p>
				<?php echo Lang::get('Published %0 in', array(date('j F', strtotime($image['article']['pub_date'])))); ?> 
				<a href="<?php echo Router::urlFor('Article', $image['article']); ?>">
					<?php echo escHTML($image['article']['title']); ?>
				</a>
			</p>
		</li>
	<?php } ?>	
</ol>
