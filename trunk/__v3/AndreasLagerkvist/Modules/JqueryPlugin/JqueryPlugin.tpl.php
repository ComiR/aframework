<h2><?php echo $plugin['title']; ?> <?php echo $plugin['version']; ?></h2>

<p>
	<small>
		<?php echo Lang::get('Created'); ?> 
		<?php echo $plugin['pub_date']; ?> 
		<?php echo Lang::get('By'); ?> 
		<?php echo $plugin['author']; ?><br />
		<a href="<?php echo $plugin['license']; ?>">
			<?php echo Lang::get('Copyright'); ?> &copy; 
			<?php echo $plugin['copyright']; ?>
		</a>
	</small>
</p>

<h3><?php echo Lang::get('What it does'); ?></h3>

<?php echo $plugin['does']; ?>

<h3><?php echo Lang::get('How to use'); ?></h3>

<?php echo $plugin['howto']; ?>

<h3><?php echo Lang::get('Example'); ?></h3>

<div id="jquery-<?php echo $plugin['url_str']; ?>-example">

	<?php echo str_replace("\n", "\n\t", $plugin['example_html']); ?>

</div>

<?php if (NAKED_DAY) { ?>
	<script type="text/javascript">
		alert('It\'s naked day today and jQuery isn\'t included on my site so the example will not work. You can still check out the source-code and download the plug-in of course.');
	</script>
<?php } ?>

<h4><?php echo Lang::get('Example code'); ?></h4>

<h5><abbr title="HyperText Markup Language">HTML</abbr></h5>

<?php echo $plugin['example_html_code']; ?>

<h5><abbr title="Javascript">JS</abbr></h5>

<?php echo $plugin['example_js_code']; ?>

<h3><?php echo Lang::get('Source code'); ?></h3>

<?php echo $plugin['source_code']; ?>

<h3><?php echo Lang::get('Download'); ?></h3>

<h4><?php echo Lang::get('Plug in'); ?></h4>

<ul>
	<?php foreach ($plugin['files']['plugin'] as $file) { ?>
		<li>
			<a href="<?php echo $file['url']; ?>">
				<?php echo $file['name']; ?>
			</a>

			<?php if ($file['size']) { ?>
				 <small>
					(<?php echo round($file['size'] / 1024, 2); ?> kb <?php echo Lang::get('Unpacked'); ?>)

					<?php if ($file['psize']) { ?>
						 (<!--<?php #echo round($file['psize'] / 1024, 2); ?> kb -->
						<a href="<?php echo WEBROOT; ?>?module=JSPacker&amp;file=<?php echo $file['url']; ?>">
							<?php echo Lang::get('Minified'); ?>
						</a>)
					<?php } ?>
				</small>
			<?php } ?>

			<?php if ($file['img']) { ?>
				 <img src="<?php echo $file['url']; ?>" alt="" />
			<?php } ?>
		</li>
	<?php } ?>
</ul>

<h4><?php echo Lang::get('Requires'); ?></h4>

<ul>
	<?php foreach ($plugin['files']['requirements'] as $file) { ?>
		<li>
			<a href="<?php echo $file['url']; ?>">
				<?php echo $file['name']; ?>
			</a>

			<?php if($file['size']) { ?>
				<small>
					(<?php echo round($file['size'] / 1024, 2); ?> kb <?php echo Lang::get('Unpacked'); ?>)
					<?php if($file['psize']) { ?>
						 (<!--<?php #echo round($file['psize'] / 1024, 2); ?> kb -->
						<a href="<?php echo WEBROOT; ?>?module=JSPacker&amp;file=<?php echo $file['url']; ?>">
							<?php echo Lang::get('Minified'); ?>
						</a>)
					<?php } ?>
				</small>
			<?php } ?>
		</li>
	<?php } ?>
</ul>

<h4><?php echo Lang::get('Other Resources'); ?></h4>

<ul>
	<li><a href="http://www.jquery.com">jQuery.com</a></li>
	<li><a href="http://plugins.jquery.com/project/<?php echo $plugin['name']; ?>">This plug-in on jQuery.com</a></li>
	<li><a href="http://plugins.jquery.com/project/issues/<?php echo $plugin['name']; ?>?category=bug">File a bug!</a></li>
</ul>