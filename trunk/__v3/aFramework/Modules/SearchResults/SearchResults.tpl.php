<ol<?php echo @$_GET['start'] > 0 ? ' start="' .($_GET['start'] + 1) .'"' : '' ?>>
	<?php foreach($results as $sr) { ?>
		<li>
			<h3><a href="<?php echo $sr['url']; ?>"><?php echo $sr['title']; ?></a></h3>

			<p><?php echo $sr['content']; ?><br /><a href="<?php echo $sr['url']; ?>">Read more</a></p>
		</li>
	<?php } ?>
</ol>

<?php if($pages) { ?>
	<ul>
		<li>
			<?php if(isset($_GET['start']) and $_GET['start'] > 0) { ?>
				<a href="<?php echo Router::urlFor('SearchResults'); ?>?q=<?php echo @$_GET['q']; ?>&amp;start=<?php echo $_GET['start'] - 8; ?>">Previous</a>
			<?php } else { ?>
				Previous
			<?php } ?>
		</li>
		<?php $i = 0; foreach($pages as $p) { $i++; ?>
			<li>
				<?php if((!isset($_GET['start']) && $p == 0) || (@$_GET['start'] == $p)) { ?>
					<strong><?php echo $i; ?></strong>
				<?php } else { ?>
					<a href="<?php echo Router::urlFor('SearchResults'); ?>?q=<?php echo @$_GET['q']; ?>&amp;start=<?php echo $p; ?>"><?php echo $i; ?></a>
				<?php } ?>
			</li>
		<?php } ?>
		<li>
			<?php if((!isset($_GET['start']) and count($pages)) or (isset($_GET['start']) and $_GET['start'] != $pages[count($pages)])) { ?>
				<a href="<?php echo Router::urlFor('SearchResults'); ?>?q=<?php echo @$_GET['q']; ?>&amp;start=<?php echo isset($_GET['start']) ? $_GET['start'] + 8 : 8; ?>">Next</a>
			<?php } else { ?>
				Next
			<?php } ?>
		</li>
	</ul>
<?php } ?>