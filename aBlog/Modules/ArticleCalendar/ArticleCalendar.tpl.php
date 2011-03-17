<table>
	<thead>
		<tr>
			<th title="<?php echo Lang::get('Sunday'); ?>">
				<?php echo Lang::get('S'); ?>
			</th>
			<th title="<?php echo Lang::get('Monday'); ?>">
				<?php echo Lang::get('M'); ?>
			</th>
			<th title="<?php echo Lang::get('Tuesday'); ?>">
				<?php echo Lang::get('T'); ?>
			</th>
			<th title="<?php echo Lang::get('Wednesday'); ?>">
				<?php echo Lang::get('W'); ?>
			</th>
			<th title="<?php echo Lang::get('Thursday'); ?>">
				<?php echo Lang::get('T'); ?>
			</th>
			<th title="<?php echo Lang::get('Friday'); ?>">
				<?php echo Lang::get('F'); ?>
			</th>
			<th title="<?php echo Lang::get('Saturday'); ?>">
				<?php echo Lang::get('S'); ?>
			</th>
		</tr>
	</thead>
	<tbody>
		<?php foreach ($weeks as $week) { ?>		
			<tr>
				<?php foreach ($week['days'] as $day) { ?>
					<?php if ($day['blank']) { ?>
						<td></td>
					<?php } else { ?>
						<td>
							<?php if ($day['today']) { ?><strong><?php } ?>
							<?php if ($day['num_articles'] > 0) { ?>
								<a href="<?php echo $day['url']; ?>">
									<?php echo $day['num']; ?>
								</a>
							<?php } else { ?>
								<?php echo $day['num']; ?>
							<?php } ?>
							<?php if ($day['today']) { ?></strong><?php } ?>
						</td>
					<?php } ?>
				<?php } ?>
			</tr>
		<?php } ?>
	</tbody>
</table>
