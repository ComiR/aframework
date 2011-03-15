<h3><?php echo Lang::get('Revisions of this %0', true, array($type)); ?></h3>

<ul>
	<?php foreach ($revisions as $revision) { ?>
		<li>
			<h4>
				<?php echo date(Config::get('general.date_format'), strtotime($revision['pub_date'])); ?> 
				<?php echo date('H:i', strtotime($revision['pub_date'])); ?>
			</h4>

			<p>
				<textarea name="revision_<?php echo $revision['revisions_id']; ?>" rows="10" cols="40" readonly="readonly"><?php echo escHTML($revision['content']); ?></textarea>
			</p>
		</li>
	<?php } ?>
</ul>

<!--
<ul>
	<?php $i = 0; foreach ($revisions as $revision) { $i++; ?>
		<li>
			<?php if ($_GET['revision'] == $revision['revisions_id'] or ($i == 1 and !$_GET['revision'])) { ?>
				<strong>
					<?php echo date(Config::get('general.date_format'), strtotime($revision['pub_date'])); ?> 
					<?php echo date('H:i', strtotime($revision['pub_date'])); ?>
				</strong>
			<?php } else { ?>
				<a href="?revision=<?php echo $revision['revisions_id']; ?>">
					<?php echo date(Config::get('general.date_format'), strtotime($revision['pub_date'])); ?> 
					<?php echo date('H:i', strtotime($revision['pub_date'])); ?>
				</a>
			<?php } ?>
		</li>
	<?php } ?>
</ul>
-->
