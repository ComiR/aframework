<form method="post" action="">

	<?php foreach ($item as $field) { if ($field['name'] != 'ts') { ?>
		<p>
			<label>
				<?php echo escHTML($field['title']); ?><br/>
				<?php if ($field['properties']['Type'] == 'longtext') { ?>
					<textarea name="<?php echo $field['name']; ?>" rows="10" cols="50"><?php echo escHTML($field['value']); ?></textarea>
				<?php } elseif ($field['properties']['enums']) { ?>
					<select name="<?php echo $field['name']; ?>">
						<?php foreach ($field['properties']['enums'] as $enum) { ?>
							<option value="<?php echo $enum; ?>"<?php echo ($field['value'] == $enum) ? ' selected="selected"' : ''; ?>>
								<?php echo $enum; ?>
							</option>
						<?php } ?>
					</select>
				<?php } else { ?>
					<input type="text" name="<?php echo $field['name']; ?>" value="<?php echo escHTML($field['value']); ?>"<?php echo ($field['name'] == Router::$params['table_name'] . '_id') ? ' readonly="readonly"' : ''; ?>/>
				<?php } ?>
			</label>
		</p>
	<?php } else { $ts = true; } } ?>

	<p>
		<?php if ($ts) { ?>
			<input type="hidden" name="ts" value="<?php echo date('Y-m-d H:i:s'); ?>"/>
		<?php } ?>
		<input type="submit" value="<?php echo $item[Router::$params['table_name'] . '_id']['value'] ? Lang::get('Save') : Lang::get('Add'); ?>"/>
	</p>

</form>
