<ul>
	<?php foreach ($langs as $lang) { ?>
		<li>
			<?php if ($lang['selected']) { ?>
				<strong>
					<?php echo htmlentities($lang['title']); ?>
				</strong>
			<?php } else { ?>
				<a href="<?php echo Router::urlForLang($lang['lc']); ?>">
					<?php echo htmlentities($lang['title']); ?>
				</a>
			<?php } ?>
		</li>
	<?php } ?> 
</ul>
