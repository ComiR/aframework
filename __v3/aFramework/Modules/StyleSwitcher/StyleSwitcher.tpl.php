<form method="get" action="">

	<p>
		<label>
			<?php echo Lang::get('Select Style'); ?><br/>
			<select name="style">
				<?php foreach ($styles as $style) { ?>
					<option value="<?php echo $style['name']; ?>"<?php if (aFramework_BaseModule::$tplVars['style'] == $style['name']) { ?> selected="selected"<?php } ?>>
						<?php echo escHTML($style['title']); ?>
					</option>
				<?php } ?>
			</select>
		</label> <input type="submit" value="<?php echo Lang::get('Go'); ?>"/>
	</p>

</form>
