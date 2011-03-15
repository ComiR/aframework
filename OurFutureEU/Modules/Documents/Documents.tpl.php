<?php if (count($documents) == 0) { ?>
	<h3><?php echo Lang::get('No Documents'); ?></h3>

	<p><?php echo Lang::get('No documents have been uploaded. Please check back later.'); ?></p>
<?php } else { ?>
	<h3><?php echo Lang::get('Reports and Documents'); ?></h3>

	<table>
		<tr>
			<th>
				<?php echo Lang::get('Name'); ?>
			</th>
			<th>
				<?php echo Lang::get('Type'); ?>
			</th>
			<th>
				<?php echo Lang::get('Size'); ?>
			</th>
			<?php if (SU) { ?>
				<th>
					<?php echo Lang::get('Delete'); ?>
				</th>
			<?php } ?>
		</tr>
		<?php foreach ($documents as $document) { ?>
			<tr>
				<td>
					<a href="<?php echo $document['path']; ?>">
						<?php echo escHTML($document['title']); ?>
					</a>
				</td>
				<td>
					<?php echo escHTML(strtoupper($document['ext'])); ?>
				</td>
				<td>
					<?php echo round($document['size']/1024/1024, 2); ?> mb
				</td>
				<?php if (SU) { ?>
					<td>
						<form method="post" action="">
							<p>
								<input type="hidden" name="delete_document" value="<?php echo $document['dir']; ?>"/>
								<input type="submit" value="<?php echo Lang::get('Delete'); ?>"/>
							</p>
						</form>
					</td>
				<?php } ?>
			</tr>
		<?php } ?>
	</table>
<?php } ?>
