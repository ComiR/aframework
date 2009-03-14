<ul>
	<li>
		<a href="#" title="<?php echo Lang::get('top_of_page'); ?>">
			<?php echo Lang::get('top'); ?>
		</a>
	</li>
	<li>
		<a href="<?php echo Router::urlFor('Contact'); ?>" title="<?php echo Lang::get('contact_me'); ?>">
			<?php echo Lang::get('contact'); ?>
		</a>
	</li>
	<li>
		<a href="http://www.getfirefox.com" title="<?php echo Lang::get('get'); ?> Firefox!">
			Firefox
		</a>
	</li>
	<li>
		<a href="http://validator.w3.org/check?uri=referer" title="<?php echo Lang::get('valid'); ?> XHTML 1.0 Strict">
			XHTML
		</a>
	</li>
	<li>
		<a href="http://jigsaw.w3.org/css-validator/check/referer" title="(<?php echo Lang::get('mostly'); ?>) <?php echo Lang::get('valid'); ?> CSS">
			CSS
		</a>
	</li>
	<?php if (ADMIN) { ?>
		<li>
			<a href="<?php echo Router::urlFor('AdminLogin'); ?>?logout">
				<?php echo Lang::get('log_out'); ?>
			</a>
		</li>
	<?php } ?>
</ul>