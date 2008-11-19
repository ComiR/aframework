<ol<?php if($start > 1) { ?> start="<?php echo $start; ?>"<?php } ?>>
<?php foreach($post_its as $post_it) { ?>
	<li><?php echo $post_it['content']; ?><?php if(ADMIN) { ?> <a href="?delete_post_it={$item_post_it.post_its_id}" title="Delete this post">[Delete]</a><?php } ?></li>
<?php } ?>
</ol>