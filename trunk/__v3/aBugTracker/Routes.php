<?php
	return array(
		'/:project_url_str/'									=> 'Tasks', 
		'/:project_url_str/' . Lang::get('url.add-task') . '/'	=> 'AddTask', 
		'/:project_url_str/:task_url_str/'						=> 'Task'
	);
?>
