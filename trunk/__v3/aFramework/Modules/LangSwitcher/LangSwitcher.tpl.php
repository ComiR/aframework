<ul>
	<?php foreach ($langs as $lang) { ?>
		<li>
			<?php if ($lang['selected']) { ?>
				<strong>
					<img src="<?php echo Router::urlForFile('flags/' . $lang['cc'] . '.gif', 'aFramework'); ?>" alt=""/> 
					<?php echo htmlentities($lang['title']); ?>
				</strong>
			<?php } else { ?>
				<a href="<?php echo Router::urlForLang($lang['lc']); ?>">
					<img src="<?php echo Router::urlForFile('flags/' . $lang['cc'] . '.gif', 'aFramework'); ?>" alt=""/> 
					<?php echo htmlentities($lang['title']); ?>
				</a>
			<?php } ?>
		</li>
	<?php } ?> 
</ul>
