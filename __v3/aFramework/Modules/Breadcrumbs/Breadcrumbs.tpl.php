<p>
	<?php foreach($crumbs as $c) { ?>
		<?php if($c['url']) { ?>
			<a href="<?php echo $c['url']; ?>"><?php echo $c['title']; ?></a> &rarr; 
		<?php } else { ?>
			<?php echo $c['title']; ?>
		<?php } ?>
	<?php } ?>
</p>