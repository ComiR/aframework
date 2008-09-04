<ul>
<?php for($i = 0; $i < 4; $i++) { ?>
	<li><img src="/__files/misc/favicon.png?url={$br.url}" alt="" /> <a href="{$br.url}" title="Visit {$br.title}">{$br.title}</a><br />{$br.description}</li>
<?php } ?>
</ul>