<?php foreach($modules as $mod) { ?>
	<div id="mod-<?php echo $mod['html_id']; ?>"<?php if($mod['in_use']) { ?> class="in-use"<?php } ?> title="<?php echo $mod['name']; ?>">

		<h2><?php echo $mod['name']; ?></h2>

		<?php if($mod['in_use']) { ?>
			<form method="post" action="">

				<p>
					<input type="hidden" name="module_listing_remove_module" value="1" />
					<input type="hidden" name="module" value="<?php echo $mod['name']; ?>" />
					<input type="submit" value="Remove module from controller" />
				</p>

			</form>
		<?php } else { ?>
			<form method="post" action="">

				<p>
					<label>
						Add this module to: 
						<select name="target">
							<option value="Base">Base</option>
							<?php foreach($modules_in_controller as $modc) { ?>
								<option value="<?php echo $modc['name']; ?>"><?php echo $modc['name']; ?></option>
							<?php } ?>
						</select>
					</label>
				</p>

				<p>
					<label>
						Or insert it before: 
						<select name="before">
							<option value="">-- Nothing --</option>
							<?php foreach($modules_in_controller as $modc) { ?>
								<option value="<?php echo $modc['name']; ?>"><?php echo $modc['name']; ?></option>
							<?php } ?>
						</select>
					</label>
				</p>

				<p>
					<input type="hidden" name="module_listing_add_module" value="1" />
					<input type="hidden" name="module" value="<?php echo $mod['name']; ?>" />
					<input type="submit" value="Add module" />
				</p>

			</form>
		<?php } ?>

	</div>
<?php } ?>