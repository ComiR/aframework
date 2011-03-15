<table>
	<tr>
		<?php foreach ($table['properties'] as $property) { ?>
			<th>
				<a href="<?php echo appendToQryStr('sort=' . $property['name'] . '&order=' . $new_order); ?>">
					<?php if ($sort == $property['name']) { ?>
						<img src="<?php echo Router::urlForFile('arrow-' . strtolower($order) . '.gif', 'aDynAdmin'); ?>" alt="Ordering by <?php echo $property['name'] . ' ' . strtolower($order) . 'ending.'; ?>"/>&nbsp;
					<?php } ?>
					<?php echo escHTML($property['title']); ?>
				</a>
			</th>
		<?php } ?>
		<th>
			<?php echo Lang::get('Edit'); ?>
		</th>
		<th>
			<?php echo Lang::get('Delete'); ?>
		</th>
	</tr>
	<?php foreach ($table['rows'] as $row) { ?>
		<tr>
			<?php foreach ($row['properties'] as $property) { ?>
				<td>
					<?php # todo: should be editable (?) ?>
					<?php echo escHTML(substr($property, 0, 50)); ?>
				</td>
			<?php } ?>
			<td>
				<a href="<?php echo Router::urlFor('DynItem', array('table_name' => $table['name'], 'item_id' => $row['id'])); ?>">
					<?php echo Lang::get('Edit'); ?>
				</a>
			</td>
			<td>
				<form method="post" action="">
					<p>
						<input type="hidden" name="delete_dyn_item" value="true"/>
						<input type="hidden" name="table_name" value="<?php echo Router::$params['table_name']; ?>"/>
						<input type="hidden" name="item_id" value="<?php echo $row['id']; ?>"/>
						<input type="submit" value="<?php echo Lang::get('Delete'); ?>"/>
					</p>
				</form>
			</td>
		</tr>
	<?php } ?>
</table>
