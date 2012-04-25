<h2><?php echo $plugin['title']; ?> <?php echo $plugin['version']; ?></h2>

<p>
	<small>
		<?php echo Lang::get('Created'); ?> 
		<?php echo $plugin['pub_date']; ?> 
		<?php echo Lang::get('by'); ?> 
		<?php echo $plugin['author']; ?><br />
		<a href="<?php echo $plugin['license']; ?>">
			<?php echo Lang::get('Copyright'); ?> &copy; 
			<?php echo $plugin['copyright']; ?>
		</a>
	</small>
</p>

<?php /* <p>
	<strong>
		Please have a look at the "<a href="#jquery-plugin-other-resources">Other Resources</a>" 
		for bug reports or further help on jQuery. <em>Do not</em> post bug reports or feature 
		requests as comments to unrelated articles. If bug reporting on 
		<a href="http://bugtracker.a-framework.org/jquery-plug-ins/add-task/">bugtracker.a-framework.org</a> 
		fails, <a href="/contact/">e-mail me</a>.
	</strong>
</p> */ ?>

<div id="jquery-plugin-what">

	<h3><?php echo Lang::get('What it Does'); ?></h3>

	<?php echo $plugin['does']; ?>

</div>

<div id="jquery-plugin-how">

	<h3><?php echo Lang::get('How to Use'); ?></h3>

	<?php echo $plugin['howto']; ?>

</div>

<div id="jquery-plugin-example-and-code">

	<ul>
		<li><a href="#jquery-plugin-example"><?php echo Lang::get('Example'); ?></a></li>
		<li><a href="#jquery-plugin-example-code"><?php echo Lang::get('Example Code'); ?></a></li>
		<li><a href="#jquery-plugin-source"><?php echo Lang::get('Plug-in Code'); ?></a></li>
	</ul>

	<div id="jquery-plugin-example">

		<h3><?php echo Lang::get('Example'); ?></h3>

		<div id="jquery-<?php echo $plugin['url_str']; ?>-example">

			<?php echo str_replace("\n", "\n\t", $plugin['example_html']); ?>

		</div>

		<?php if (NAKED_DAY) { ?>
			<script type="text/javascript">
				alert('It\'s naked day today and jQuery isn\'t included on my site so the example will not work. You can still check out the source-code and download the plug-in of course.');
			</script>
		<?php } ?>

	</div>

	<div id="jquery-plugin-example-code">

		<h3><?php echo Lang::get('Example Code'); ?></h3>

		<h4><abbr title="HyperText Markup Language">HTML</abbr></h4>

		<?php echo $plugin['example_html_code']; ?>

		<h4><abbr title="Javascript">JS</abbr></h4>

		<?php echo $plugin['example_js_code']; ?>

	</div>

	<div id="jquery-plugin-source">

		<h3><?php echo Lang::get('Source Code'); ?></h3>

		<?php echo $plugin['source_code']; ?>

	</div>

</div>

<div id="jquery-plugin-download">

	<h3><?php echo Lang::get('Download'); ?></h3>

	<h4><?php echo Lang::get('Plug-in'); ?></h4>

	<ul>
		<?php foreach ($plugin['files']['plugin'] as $file) { ?>
			<li>
				<a href="<?php echo $file['url']; ?>">
					<?php echo $file['name']; ?>
					<?php if ($file['img']) { ?>
						 <br /><img src="<?php echo $file['url']; ?>" alt="" />
					<?php } ?>
				</a>

				<?php if ($file['size']) { ?>
					 <small>
						(<?php echo round($file['size'] / 1024, 2); ?> kb <?php echo Lang::get('Unpacked'); ?>)

						<?php if ($file['psize']) { ?>
							 (<!--<?php #echo round($file['psize'] / 1024, 2); ?> kb -->
							<a href="<?php echo Router::urlForUtil('JSPacker') . '?file=' . $file['url']; ?>">
								<?php echo Lang::get('Minified'); ?>
							</a>)
						<?php } ?>
					</small>
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
							<a href="<?php echo Router::urlForUtil('JSPacker') . '?file=' . $file['url']; ?>">
								<?php echo Lang::get('Minified'); ?>
							</a>)
						<?php } ?>
					</small>
				<?php } ?>
			</li>
		<?php } ?>
	</ul>

</div>

<div id="jquery-plugin-other-resources">

	<h3><?php echo Lang::get('Other Resources'); ?></h3>

	<ul>
		<li>
			<a href="http://www.jquery.com">
				jQuery.com
			</a>
		</li>
		<li>
			<a href="http://plugins.jquery.com/project/<?php echo $plugin['url_str']; ?>">
				This plug-in on jQuery.com
			</a>
		</li>
		<li>
			<a href="http://code.google.com/p/aframework/source/browse/trunk/aFramework/Modules/Base/<?php echo $plugin['file_name']; ?>">
				This plug-in on Google Code
			</a>
		</li>
		<li>
			<a href="<?php echo Router::urlFor('Page', array('url_str' => 'how-to-include-a-jquery-plug-in')); ?>">
				How to Include a jQuery Plug-in
			</a>
		</li>
		<li>
		<!--<a href="http://plugins.jquery.com/project/issues/<?php echo $plugin['url_str']; ?>?category=bug">-->
			<a href="http://bugtracker.a-framework.org/jquery-plug-ins/add-task/">
				Report a bug!
			</a>
		</li>
	</ul>

</div>
