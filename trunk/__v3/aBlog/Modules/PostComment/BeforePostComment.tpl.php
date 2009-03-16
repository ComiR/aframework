<h3><?php echo Lang::get('post_a_comment'); ?></h3>

<?php if ( $errors ) { ?>
	<p>
		<strong>
			<?php echo Lang::get('the_form_contains_errors'); ?> 
			<?php echo Lang::get('please_make_sure_you_have_filled_out_everything_correctly'); ?>
		</strong>
	</p>
<?php } ?>