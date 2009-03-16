<h2>
	<?php echo Lang::get('no_search_results_for'); ?> 
	&quot;<?php echo htmlentities($_GET['q']); ?>&quot;
</h2>

<p>
	<?php echo Lang::get('your_search'); ?> - 
	&quot;<strong><?php echo @htmlentities($_GET['q']); ?></strong>&quot; - 
	<?php echo Lang::get('did_not_match_any_documents'); ?>
</p>

<h3><?php echo Lang::get('suggestions'); ?></h3>

<ul>
	<li><?php echo Lang::get('make_sure_all_your_words_are_spelled_correctly'); ?></li>
	<li><?php echo Lang::get('try_different_keywords'); ?></li>
	<li><?php echo Lang::get('try_more_general_keywords'); ?></li>
</ul>