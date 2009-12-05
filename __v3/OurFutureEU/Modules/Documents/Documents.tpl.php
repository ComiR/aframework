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
		<?php if (ADMIN) { ?>
			<th>
				<?php echo Lang::get('Delete'); ?>
			</th>
		<?php } ?>
	</tr>
	<?php foreach ($documents as $document) { ?>
		<tr>
			<td>
				<a href="<?php echo $document['path']; ?>">
					<?php echo htmlentities($document['title']); ?>
				</a>
			</td>
			<td>
				<?php echo htmlentities(strtoupper($document['ext'])); ?>
			</td>
			<td>
				<?php echo round($document['size']/1024/1024, 2); ?> mb
			</td>
			<?php if (ADMIN) { ?>
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
