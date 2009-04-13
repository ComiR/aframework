<ul>
	<li>
		<a href="#" title="<?php echo Lang::get('Top of page'); ?>">
			<?php echo Lang::get('Top'); ?>
		</a>
	</li>
	<li>
		<a href="<?php echo Router::urlFor('Contact'); ?>" title="<?php echo Lang::get('Contact me'); ?>">
			<?php echo Lang::get('Contact'); ?>
		</a>
	</li>
	<li>
		<a href="http://www.getfirefox.com" title="<?php echo Lang::get('Get'); ?> Firefox!">
			Firefox
		</a>
	</li>
	<li>
		<a href="http://validator.w3.org/check?uri=referer" title="<?php echo Lang::get('Valid'); ?> XHTML 1.0 Strict">
			XHTML
		</a>
	</li>
	<li>
		<a href="http://jigsaw.w3.org/css-validator/check/referer" title="(<?php echo Lang::get('Mostly'); ?>) <?php echo Lang::get('Valid'); ?> CSS">
			CSS
		</a>
	</li>
	<?php if (ADMIN) { ?>
		<li>
			<a href="<?php echo Router::urlFor('AdminLogin'); ?>?logout">
				<?php echo Lang::get('Log out'); ?>
			</a>
		</li>
	<?php } ?>
</ul>