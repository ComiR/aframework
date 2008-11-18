<ul>
	<?php foreach(array('jquery', 'news', 'css', 'web standards', 'aframework', 'javascript', 'ajax', 'design', 'hijax', 'work', 'bored', 'funny') as $word) { ?>
		<li><a href="#"><?php echo $word; ?></a> (<?php echo rand(1, 100); ?>)</li>
	<?php } ?>
</ul>