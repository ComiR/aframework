<h2><?php echo Lang::get('All Published Comics'); ?></h2>

<ul>
	<?php foreach ($images as $image) { ?>
		<li>
			<a href="<?php echo $image['url']; ?>">
				<img src="<?php echo $image['url']; ?>" alt=""/>
			</a>

			<?php if (SU) { ?>
				<form method="post" action="">

					<p>
						<input type="hidden" name="delete_comic" value="1"/>
						<input type="hidden" name="name" value="<?php echo $image['name']; ?>"/>
						<input type="submit" value="<?php echo Lang::get('Delete'); ?>"/>
					</p>

				</form>
			<?php } ?>
		</li>
	<?php } ?>
</ul>

<p>Copyright &copy; <a href="http://www.bonton.se">Hans Lindström</a>.</p>
