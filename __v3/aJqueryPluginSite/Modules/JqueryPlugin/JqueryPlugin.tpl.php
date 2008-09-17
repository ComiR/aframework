<h2><?php echo $plugin['title']; ?> <?php echo $plugin['version']; ?></h2>

<p><small>Created <?php echo $plugin['pub_date']; ?> by <?php echo $plugin['author']; ?><br /><a href="<?php echo $plugin['license']; ?>">Copyright &copy; <?php echo $plugin['copyright']; ?></a></small></p>

<h3>What it does</h3>

<?php echo $plugin['does']; ?>

<h3>How to use</h3>

<?php echo $plugin['howto']; ?>

<h3>Example</h3>

<?php echo $plugin['example_html']; ?>

<?php echo $plugin['example_js']; ?>

<h4>Example code</h4>

<h5><abbr title="HyperText Markup Language">HTML</abbr></h5>

<?php echo $plugin['example_html_code']; ?>

<h5><abbr title="Javascript">JS</abbr></h5>

<?php echo $plugin['example_js_code']; ?>

<h3>Source code</h3>

<?php echo $plugin['source_code']; ?>

<h3>Download</h3>

<h4>Plug-in</h4>

<ul>
	<?php foreach($plugin['files']['plugin'] as $file) { ?>
		<li><a href="<?php echo $file['url']; ?>"><?php echo $file['name']; ?></a></li>
	<?php } ?>
</ul>

<h4>Requires</h4>

<ul>
	<?php foreach($plugin['files']['requirements'] as $file) { ?>
		<li><a href="<?php echo $file['url']; ?>"><?php echo $file['name']; ?></a></li>
	<?php } ?>
</ul>