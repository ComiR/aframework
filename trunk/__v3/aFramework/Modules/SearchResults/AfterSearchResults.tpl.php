<?php if ($pages) { ?>
	<ul>
		<li>
			<?php if (isset($_GET['start']) and $_GET['start'] > 0) { ?>
				<a href="<?php echo Router::urlFor('SearchResults'); ?>?q=<?php echo @urlencode($_GET['q']); ?>&amp;start=<?php echo $_GET['start'] - 8; ?>">
					<?php echo Lang::get('previous'); ?>
				</a>
			<?php } else { ?>
				<?php echo Lang::get('previous'); ?>
			<?php } ?>
		</li>
		<?php $i = 0; foreach ($pages as $p) { $i++; ?>
			<li>
				<?php if ((!isset($_GET['start']) && $p == 0) || (@$_GET['start'] == $p)) { ?>
					<strong>
						<?php echo $i; ?>
					</strong>
				<?php } else { ?>
					<a href="<?php echo Router::urlFor('SearchResults'); ?>?q=<?php echo @urlencode($_GET['q']); ?>&amp;start=<?php echo $p; ?>">
						<?php echo $i; ?>
					</a>
				<?php } ?>
			</li>
		<?php } ?>
		<li>
			<?php if ((!isset($_GET['start']) and count($pages)) or (isset($_GET['start']) and $_GET['start'] != $pages[count($pages)])) { ?>
				<a href="<?php echo Router::urlFor('SearchResults'); ?>?q=<?php echo @urlencode($_GET['q']); ?>&amp;start=<?php echo isset($_GET['start']) ? $_GET['start'] + 8 : 8; ?>">
					<?php echo Lang::get('next'); ?>
				</a>
			<?php } else { ?>
				<?php echo Lang::get('next'); ?>
			<?php } ?>
		</li>
	</ul>
<?php } ?>