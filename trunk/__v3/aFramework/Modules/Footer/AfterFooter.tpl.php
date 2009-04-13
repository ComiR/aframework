<p>
	<?php echo Lang::get('Copyright'); ?> &copy; 
	<?php echo date('Y'); ?> 
	<?php echo Config::get('general.site_author'); ?>. 
	<a href="http://creativecommons.org/licenses/by/3.0/" title="<?php echo Lang::get('All contents are released under a CCv3'); ?>">
		<?php echo Lang::get('Some rights reserved'); ?>
	</a>.<br />
	<small>
		<?php echo Config::get('general.site_title'); ?> 
		<?php echo Lang::get('Is powered by'); ?> 
		<?php
			if (CURRENT_SITE == 'aFramework') {
				echo '<a href="http://aframework.pixlperfik.com">aFramework</a>';
			}
			else {
				$sites		= explode(' ', SITE_HIERARCHY);
				$numSites	= count($sites) - 1;
				$i			= 0;
				foreach ($sites as $site) {
					if ($site != CURRENT_SITE) {
						echo '<a href="http://' . strtolower($site) . '.pixlperfik.com">' . $site . '</a>';
						echo ++$i < $numSites - 1 ? ', ' : ($i < $numSites ? ' ' . Lang::get('And') . ' ' : '');
					}
				}
			}
		?>. 
		<?php echo round(Timer::stop(), 2); ?> 
		<?php echo Lang::get('Seconds'); ?>, 
		<?php $qryInfo = dbQry(false, true); echo count($qryInfo['cached_queries']); ?>  
		<?php echo Lang::get('Queries'); ?> 
		(<?php echo (count($qryInfo['cached_queries']) - $qryInfo['num_queries']); ?> <?php echo Lang::get('Cached'); ?>).
	</small>
</p>