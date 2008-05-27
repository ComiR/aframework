<h2>Search results for &quot;<?php echo @$_GET['q']; ?>&quot;</h2>

<ol<?php echo @$_GET['start'] > 0 ? ' start="' .($_GET['start'] + 1) .'"' : '' ?>>
<?php foreach($search_results['results'] as $sr) { ?>
	<li>
		<h3><a href="<?php echo $sr['url']; ?>"><?php echo $sr['title']; ?></a></h3>

		<p><?php echo $sr['content']; ?><br /><a href="<?php echo $sr['url']; ?>">Read more</a></p>
	</li>
<?php } ?>
</ol>

<?php if($search_results['pages']) { ?>
	<ul>
	<?php $i = 0; foreach($search_results['pages'] as $p) { $i++; ?>
		<li>
			<?php if((!isset($_GET['start']) && $p == 0) || (@$_GET['start'] == $p)) { ?>
				<strong><?php echo $i; ?></strong>
			<?php } else { ?>
				<a href="/search/?q=<?php echo @$_GET['q']; ?>&amp;start=<?php echo $p; ?>"><?php echo $i; ?></a>
			<?php } ?>
		</li>
	<?php } ?>
	</ul>
<?php } ?>