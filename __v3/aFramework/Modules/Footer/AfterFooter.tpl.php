<p>
	<?php echo Lang::get('Copyright'); ?> &copy; 
	<?php echo date('Y'); ?> 
	<?php echo htmlentities(Config::get('general.site_author')); ?>. 
	<a href="http://creativecommons.org/licenses/by/3.0/" title="<?php echo Lang::get('All contents are released under a CCv3'); ?>">
		<?php echo Lang::get('Some Rights Reserved.'); ?>
	</a><br />
	<small>
		<?php echo htmlentities(Config::get('general.site_title')); ?> 
		<?php echo Lang::get('is powered by'); ?> 
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
						echo ++$i < $numSites - 1 ? ', ' : ($i < $numSites ? ' ' . Lang::get('and') . ' ' : '');
					}
				}
			}
		?>. 
		<?php echo round(Timer::stop(), 2); ?> 
		<?php echo Lang::get('seconds'); ?>, 
		<?php echo DB::getNumQueries(); ?>  
		<?php echo Lang::get('queries'); ?>.
	</small>
</p>
