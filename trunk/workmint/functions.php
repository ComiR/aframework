<?php
	add_action('init', 'register_my_menus');

	function register_my_menus () {
		register_nav_menus(
			array(
				'primary-menu'		=> __( 'Primary Menu' ),
				'workmint-menu'		=> __( 'Workmint Menu' ), 
				'helpdesk-menu'		=> __( 'Helpdesk Menu' ), 
				'register-menu'		=> __( 'Register Menu' )
			)
		);
	}
?>
