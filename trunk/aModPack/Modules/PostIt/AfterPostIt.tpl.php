<ul>
	<li>
		<?php if ($prev === false) {
			echo Lang::get('Newer');
		} else { ?>
			<a href="?post_it_start=<?php echo $prev; ?>">
				<?php echo Lang::get('Newer'); ?>
			</a>
		<?php } ?>
	</li>
	<li>
		<?php if($next === false) {
			echo Lang::get('Older');
		} else { ?>
			<a href="?post_it_start=<?php echo $next; ?>">
				<?php echo Lang::get('Older'); ?>
			</a>
		<?php } ?>
	</li>
</ul>

<?php if (ADMIN) { ?>
	<form method="post" action="">

		<p>
			<label>
				<?php echo Lang::get('Say This'); ?><br />
				<input type="text" name="post_it_text" size="25" />
			</label> <input type="submit" value="<?php echo Lang::get('Post It'); ?>" />
		</p>
	
	</form>
<?php } ?>