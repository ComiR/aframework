<?php
	class FormValidator {
		private $commonFields = array(
			'name'		=> 'strlen($v) > 0',
			'author'	=> 'strlen($v) > 0',
			'message'	=> 'strlen($v) > 0',
			'comment'	=> 'strlen($v) > 0',
			'url'		=> 'preg_match("/^(http:\/\/)?(www)?([^ |\.]*?)\.([^ ]){2,5}$/", $v) || $v == ""', # needs improvement
			'email'		=> 'preg_match("/^.+?@.+?\..{2,4}$/", $v)' # needs improvement
		);
		private $validatedFields = array();

		public function __construct($fields = array()) {
			$this->commonFields = array_merge($this->commonFields, $fields);
		}

		public function validate($fields, $specificField = false) {
			$allGood = true;

			if($specificField) {
				$tmp = array($specificField => $fields[$specificField]);
				$fields[] = $tmp;
			}

			foreach($fields as $name => $v) {
				$condition = true;

				if(isset($this->commonFields[$name])) {
					eval('$condition = (' .$this->commonFields[$name] .') ? true : false;');
				}

				if($condition) {
					$this->validatedFields[$name] = true;
				}
				else {
					$allGood = false;
					$this->validatedFields[$name] = false;
				}
			}

			return $allGood;
		}

		public function getValidatedFields() {
			return (count($this->validatedFields)) ? $this->validatedFields : false;
		}
	}
?>