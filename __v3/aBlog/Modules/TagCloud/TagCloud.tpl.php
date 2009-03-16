<ul>
	<?php foreach ($tags as $t) { ?>
		<li>
			<a href="<?php echo Router::urlFor('ArticlesByTag', $t); ?>">
				<?php echo htmlentities($t['title']); ?>
			</a> 
			<strong>(<?php echo $t['num_articles']; ?>)</strong>

			<?php if (ADMIN) { ?>
				<form method="post" action="">
					<p>
						<input type="hidden" name="tag_cloud_delete" value="1" />
						<input type="hidden" name="tags_id" value="<?php echo $t['tags_id']; ?>" />
						<input type="submit" value="<?php echo Lang::get('delete'); ?>" />
					</p>
				</form>
			<?php } ?>
		</li>
	<?php } ?>
</ul>