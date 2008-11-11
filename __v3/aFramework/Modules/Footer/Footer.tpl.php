<ul>
	<li><a href="#" title="Top of Page">Top</a></li>
	<li><a href="<?php echo Router::urlFor('Contact'); ?>" title="Contact Me">Contact</a></li>
	<li><a href="http://www.getfirefox.com" title="Get Firefox!">Firefox</a></li>
	<li><a href="http://validator.w3.org/check?uri=referer" title="Valid XHTML 1.0 Strict">XHTML</a></li>
	<li><a href="http://jigsaw.w3.org/css-validator/check/referer" title="(Mostly) Valid CSS">CSS</a></li>
	<li><a href="<?php echo Router::urlFor('AdminLogin'); ?>" title="This really shouldn't be here">Admin</a></li>
</ul>

<p>
	Copyright &copy; <?php echo date('Y'); ?> <?php echo SITE_AUTHOR; ?>. <a href="http://creativecommons.org/licenses/by/3.0/" title="All articles, content, scripts, images, etc are released under a CCv3">Some Rights Reserved</a>.<br />
	<small>
		<?php echo SITE_TITLE; ?> is powered by 
		<?php
			if(CURRENT_SITE == 'aFramework') {
				echo '<a href="http://aframework.pixlperfik.com">aFramework</a>';
			}
			else {
				$sites = explode(' ', SITE_HIERARCHY);
				$numSites = count($sites) - 1;
				$i = 0;
				foreach($sites as $site) {
					if($site != CURRENT_SITE) {
						echo '<a href="http://' .strtolower($site) .'.pixlperfik.com">' .$site .'</a>';
						echo ++$i < $numSites - 1 ? ', ' : ($i < $numSites ? ' and ' : '');
					}
				}
			}
		?>. <?php echo Timer::end(); ?> second(s) | <?php echo dbQry(false, true); ?> queries.
	</small>
</p>
