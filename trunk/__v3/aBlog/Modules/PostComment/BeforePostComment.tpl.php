<h3><?php echo Lang::get('Post a Comment'); ?></h3>

<?php if ( $errors ) { ?>
	<p>
		<strong>
			<?php echo Lang::get('The form contains errors.'); ?> 
			<?php echo Lang::get('Please make sure you have filled out everything correctly'); ?>
		</strong>
	</p>
<?php } ?>