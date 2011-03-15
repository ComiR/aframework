<!--
<object type="application/x-shockwave-flash" data="<?php echo Router::urlForFile('aframework-intro.swf'); ?>" width="940" height="500">
	<param name="movie" value="<?php echo Router::urlForFile('aframework-intro.swf'); ?>" />
</object>
-->
<ul>
	<?php foreach ($guide_steps as $step) { ?>
		<li>
			<img src="<?php echo $step['img_url']; ?>" alt=""/>

			<?php foreach ($step['points'] as $point) { ?>
				<p><?php echo escHTML($point); ?></p>
			<?php } ?>
		</li>
	<?php } ?>
</ul>
