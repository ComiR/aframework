<ul>
	<li>
		<a href="http://demo.a-framework.org">
			<strong>Check out the Demo</strong><br/>
			<small>Try before you <del>buy</del> <ins>download free</ins></small>
		</a>
	</li>
	<li>
		<a href="<?php echo $download['url']; ?>">
			<strong>Download Latest</strong><br/>
			<small><?php echo $download['version']; ?> - <?php echo round($download['filesize'] / 1024); ?> kb</small>
		</a>
	</li>
</ul>
