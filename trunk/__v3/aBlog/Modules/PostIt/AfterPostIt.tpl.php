<ul>
	<li>
		<?php if ( $prev === false ) {
			echo Lang::get('newer')
		} else { ?>
			<a href="?post_it_start=<?php echo $prev; ?>">
				<?php echo Lang::get('newer'); ?>
			</a>
		<?php } ?>
	</li>
	<li>
		<?php if($next === false) {
			<?php echo Lang::get('older'); ?>
		} else { ?>
			<a href="?post_it_start=<?php echo $next; ?>"><?php echo Lang::get('older'); ?></a>
		<?php } ?>
	</li>
</ul>

<?php if ( ADMIN ) { ?>
	<form method="post" action="">

		<p>
			<label>
				<?php echo Lang::get('say_this'); ?><br />
				<input type="text" name="post_it_text" size="25" />
			</label> <input type="submit" value="<?php echo Lang::get('post_it'); ?>" />
		</p>
	
	</form>
<?php } ?>