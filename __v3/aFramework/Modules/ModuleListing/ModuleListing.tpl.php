<h2>Page Creator</h2>

<p>With the page-creator you can add and remove modules on the page you are viewing.</p>

<p>Simply use the form below each module in the list to either append it to another module, insert it <em>before</em> a module or remove it.</p>

<?php foreach($modules as $mod) { ?>
	<div id="mod-<?php echo $mod['html_id']; ?>"<?php if($mod['in_use']) { ?> class="in-use"<?php } ?>>

		<h3><?php echo $mod['name']; ?></h3>

		<?php if($mod['in_use']) { ?>
			<form method="post" action="">

				<p>
					<input type="hidden" name="module_listing_remove_module" value="1" />
					<input type="hidden" name="used_controller" value="<?php echo $_GET['controller']; ?>" />
					<input type="hidden" name="module_to_remove" value="<?php echo $mod['name']; ?>" />
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
					<input type="hidden" name="used_controller" value="<?php echo $_GET['controller']; ?>" />
					<input type="hidden" name="module_to_add" value="<?php echo $mod['name']; ?>" />
					<input type="submit" value="Add module" />
				</p>

			</form>
		<?php } ?>

	</div>
<?php } ?>