<ul>
	<?php foreach ($links as $l) { ?>
		<li>
			<a href="<?php echo htmlentities($l['url']); ?>">
				<?php echo htmlentities($l['title']); ?>
			</a><br />
			<?php echo htmlentities($l['description']); ?>

			<?php if (ADMIN) { ?>
				<form method="post" action="">
					<p>
						<input type="hidden" name="random_links_delete" value="1" />
						<input type="hidden" name="links_id" value="<?php echo $l['links_id']; ?>" />
						<input type="submit" value="<?php echo Lang::get('Delete'); ?>" />
					</p>
				</form>
			<?php } ?>
		</li>
	<?php } ?>
</ul>