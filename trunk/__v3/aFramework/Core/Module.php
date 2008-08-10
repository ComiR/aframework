<?php
	/**
	 * Module
	 *
	 * Every module in aFramework -should- _can_ extend this module
	 * Although the vars in here are mandatory so it's easier to write extens Module
	 * than to declare them all over again. Also - in the future more stuff may be added here
	 **/
	class Module {
		public static $tplVars = array();

		public static $tplFile = true; # true = ModuleName.tpl.php, false = no view, 'Foo' = Foo.tpl.php

		public static $forceController = false;
	}
?>