<p>
	Copyright &copy; <?php echo date('Y'); ?> <?php echo Config::get('general.site_author'); ?>. <a href="http://creativecommons.org/licenses/by/3.0/" title="All articles, content, scripts, images, etc are released under a CCv3">Some Rights Reserved</a>.<br />
	<small>
		<?php echo Config::get('general.site_title'); ?> is powered by 
		<?php
			if(CURRENT_SITE == 'aFramework') {
				echo '<a href="http://aframework.pixlperfik.com">aFramework</a>';
			}
			else {
				$sites		= explode(' ', SITE_HIERARCHY);
				$numSites	= count($sites) - 1;
				$i			= 0;
				foreach($sites as $site) {
					if($site != CURRENT_SITE) {
						echo '<a href="http://' .strtolower($site) .'.pixlperfik.com">' .$site .'</a>';
						echo ++$i < $numSites - 1 ? ', ' : ($i < $numSites ? ' and ' : '');
					}
				}
			}
		?>. <?php echo round(Timer::stop(), 2); ?> seconds, <?php $qryInfo = dbQry(false, true); echo $qryInfo['num_queries']; ?> queries.
	</small>
</p>