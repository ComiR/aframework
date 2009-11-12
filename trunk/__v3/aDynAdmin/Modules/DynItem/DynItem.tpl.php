<form method="post" action="">

	<?php foreach ($item as $field) { ?>
		<p>
			<label>
				<?php echo htmlentities($field['title']); ?><br/>
				<?php if ($field['properties']['Type'] == 'longtext') { ?>
					<textarea name="<?php echo $field['name']; ?>" rows="10" cols="50"><?php echo htmlentities($field['value']); ?></textarea>
				<?php } else { ?>
					<input type="text" name="<?php echo $field['name']; ?>" value="<?php echo htmlentities($field['value']); ?>"<?php echo ($field['name'] == Router::$params['table_name'] . '_id' and empty($field['value'])) ? ' readonly="readonly"' : ''; ?>/>
				<?php } ?>
			</label>
		</p>
	<?php } ?>

	<p>
		<input type="submit" value="<?php echo $item[Router::$params['table_name'] . '_id']['value'] ? Lang::get('Save') : Lang::get('Add'); ?>"/>
	</p>

</form>
