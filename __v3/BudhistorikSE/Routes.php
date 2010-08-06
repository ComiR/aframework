<?php return array(
	'/login/'						=> 'UserLogin', 	# The login-page for users
	'/kontor/'						=> 'Offices', 		# Every registered office
	'/kontor/:offices_id([0-9]+)/'	=> 'Office', 		# A specific office (with all its users and objects)
	'/objekt/'						=> 'Objects', 		# Every registered object (except inactive ones)
	'/objekt/:objects_id([0-9]+)/'	=> 'Object', 		# A specific object (with all its bids and its user)
	'/maklare/'						=> 'Users', 		# Every registered 'user' (real estate agent)
	'/maklare/:users_id([0-9]+)/'	=> 'User'			# A specific user (with its office and objects)
); ?>
