<ul>
	<li><a href="#" title="Top of Page">Top</a></li>
	<li><a href="<?php echo Router::urlFor('Contact'); ?>" title="Contact Me">Contact</a></li>
	<li><a href="http://www.getfirefox.com" title="Get Firefox!">Firefox</a></li>
	<li><a href="http://validator.w3.org/check?uri=referer" title="Valid XHTML 1.0 Strict">XHTML</a></li>
	<li><a href="http://jigsaw.w3.org/css-validator/check/referer" title="(Mostly) Valid CSS">CSS</a></li>
	<?php if(ADMIN) { ?>
		<li><a href="<?php echo Router::urlFor('AdminLogin'); ?>?logout">Log out</a></li>
	<?php } ?>
</ul>