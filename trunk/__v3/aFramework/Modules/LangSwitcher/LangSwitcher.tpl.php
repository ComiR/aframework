<ul>
	<?php foreach ($langs as $lang) { ?>
		<li>
			<?php if ($lang['selected']) { ?>
				<strong>
					<img src="<?php echo Router::urlForFile('flags/' . $lang['cc'] . '.gif', 'aFramework'); ?>" alt=""/> 
					<?php echo escHTML($lang['title']); ?>
				</strong>
			<?php } else { ?>
				<a href="<?php echo Router::urlForLang($lang['lc']); ?>?set_lang">
					<img src="<?php echo Router::urlForFile('flags/' . $lang['cc'] . '.gif', 'aFramework'); ?>" alt=""/> 
					<?php echo escHTML($lang['title']); ?>
				</a>
			<?php } ?>
		</li>
	<?php } ?> 
</ul>
