<h2><?php echo $plugin['title']; ?> <?php echo $plugin['version']; ?></h2>

<p>
	<small>
		<?php echo Lang::get('created'); ?> 
		<?php echo $plugin['pub_date']; ?> 
		<?php echo Lang::get('by'); ?> 
		<?php echo $plugin['author']; ?><br />
		<a href="<?php echo $plugin['license']; ?>">
			<?php echo Lang::get('copyright'); ?> &copy; 
			<?php echo $plugin['copyright']; ?>
		</a>
	</small>
</p>

<h3><?php echo Lang::get('what_it_does'); ?></h3>

<?php echo $plugin['does']; ?>

<h3><?php echo Lang::get('how_to_use'); ?></h3>

<?php echo $plugin['howto']; ?>

<h3><?php echo Lang::get('example'); ?></h3>

<div id="jquery-<?php echo $plugin['url_str']; ?>-example">

	<?php echo str_replace("\n", "\n\t", $plugin['example_html']); ?>

</div>

<?php if ( NAKED_DAY ) { ?>
	<script type="text/javascript">
		alert('It\'s naked day today and jQuery isn\'t included on my site so the example will not work. You can still check out the source-code and download the plug-in of course.');
	</script>
<?php } ?>

<h4><?php echo Lang::get('example_code'); ?></h4>

<h5><abbr title="HyperText Markup Language">HTML</abbr></h5>

<?php echo $plugin['example_html_code']; ?>

<h5><abbr title="Javascript">JS</abbr></h5>

<?php echo $plugin['example_js_code']; ?>

<h3><?php echo Lang::get('source_code'); ?></h3>

<?php echo $plugin['source_code']; ?>

<h3><?php echo Lang::get('download'); ?></h3>

<h4><?php echo Lang::get('plug_in'); ?></h4>

<ul>
	<?php foreach ( $plugin['files']['plugin'] as $file ) { ?>
		<li>
			<a href="<?php echo $file['url']; ?>">
				<?php echo $file['name']; ?>
			</a>

			<?php if ( $file['size'] ) { ?>
				 <small>
					(<?php echo round($file['size'] / 1024, 2); ?> kb <?php echo Lang::get('unpacked'); ?>)

					<?php if ( $file['psize'] ) { ?>
						 (<!--<?php #echo round($file['psize'] / 1024, 2); ?> kb -->
						<a href="<?php echo WEBROOT; ?>?module=JSPacker&amp;file=<?php echo $file['url']; ?>">
							<?php echo Lang::get('minified'); ?>
						</a>)
					<?php } ?>
				</small>
			<?php } ?>

			<?php if ( $file['img'] ) { ?>
				 <img src="<?php echo $file['url']; ?>" alt="" />
			<?php } ?>
		</li>
	<?php } ?>
</ul>

<h4><?php echo Lang::get('requires'); ?></h4>

<ul>
	<?php foreach ( $plugin['files']['requirements'] as $file ) { ?>
		<li>
			<a href="<?php echo $file['url']; ?>">
				<?php echo $file['name']; ?>
			</a>

			<?php if($file['size']) { ?>
				<small>
					(<?php echo round($file['size'] / 1024, 2); ?> kb <?php echo Lang::get('unpacked'); ?>)
					<?php if($file['psize']) { ?>
						 (<!--<?php #echo round($file['psize'] / 1024, 2); ?> kb -->
						<a href="<?php echo WEBROOT; ?>?module=JSPacker&amp;file=<?php echo $file['url']; ?>">
							<?php echo Lang::get('minified'); ?>
						</a>)
					<?php } ?>
				</small>
			<?php } ?>
		</li>
	<?php } ?>
</ul>