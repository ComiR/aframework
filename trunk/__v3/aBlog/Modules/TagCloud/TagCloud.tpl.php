<ul>
	<?php
			$words = array('accessibility', 'internet', 'google', 'portfolio', 'freelancing', 'food', 'life', 'jquery', 'news', 'css', 'web standards', 'aframework', 'javascript', 'ajax', 'design', 'hijax', 'work', 'bored', 'funny');
			sort($words);
			foreach($words as $word) { ?>
		<li><a href="#"><?php echo str_replace(' ', '&nbsp;', $word); ?></a><strong>(<?php echo rand(7, 34); ?>)</strong></li>
	<?php } ?>
</ul>