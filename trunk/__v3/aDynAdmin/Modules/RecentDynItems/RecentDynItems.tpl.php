<ul>
	<?php foreach ($recent_items as $item) { ?>
		<li>
			<a href="<?php echo Router::urlFor('DynItems', array('table_name' => $item['table']['name'])); ?>">
				<?php echo $item['num_items'] . ' ' . Lang::get('new') . ' ' . $item['table']['title']; ?>
			</a>
		</li>
	<?php } ?>
</ul>
