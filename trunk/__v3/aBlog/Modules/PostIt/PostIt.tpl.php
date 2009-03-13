<ol<?php if ($start > 1) { ?> start="<?php echo $start; ?>"<?php } ?>>
	<?php foreach ($post_its as $post_it) { ?>
		<li>
			<?php echo $post_it['content']; ?>

			<?php if (ADMIN) { ?>
				<form method="post" action="">
					<p>
						<input type="hidden" name="post_it_delete" value="1" />
						<input type="hidden" name="post_its_id" value="<?php echo $post_it['post_its_id']; ?>" />
						<input type="submit" value="<?php echo Lang::get('delete'); ?>" />
					</p>
				</form>
			<?php } ?>
		</li>
	<?php } ?>
</ol>