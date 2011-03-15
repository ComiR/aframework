<?php
	class aDynAdmin_DBAdminModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!SU) {
				FourOFour::run();
			}

			self::handleCreateDBTable();
		#	self::handleImportDB();
		#	self::handleExportDB();
		}

		private static function handleCreateDBTable () {
			# If user has selected number of fields
			if (isset($_POST['num_fields'])) {
				self::createAddTableForm($_POST['num_fields']);
			}
			else {
				self::createNumFieldsForm();
			}
		}

		private static function createNumFieldsForm () {
			$form = new FormHandler();

			$form->addField(array(
				'name'		=> 'num_fields', 
				'title'		=> Lang::get('Number of Fields'), 
				'type'		=> 'select', 
				'options'	=> array_combine(range(1, 20), range(1, 20))
			));

			self::$tplVars['create_db_form'] = $form->asHTML();
		}

		private static function createAddTableForm ($numFields) {
			$form = new FormHandler();

			$form->addValuesArray($_POST);
			
			$form->addField(array(
				'name'		=> 'table_name', 
				'title'		=> Lang::get('Name of Table'), 
				'type'		=> 'text', 
				'required'	=> true, 
				'validation'=> 'sql_table_name'
			));

			for ($i = 0; $i < $numFields; $i++) {
				$form->addField(array(
					'name'		=> 'field_' . $i . '_name', 
					'title'		=> Lang::get('Name of Field %0', array($i + 1)), 
					'type'		=> 'text', 
					'required'	=> true, 
					'validation'=> 'sql_table_name'
				));
				$form->addField(array(
					'name'		=> 'field_' . $i . '_type', 
					'title'		=> Lang::get('Type of Field %0', array($i + 1)), 
					'type'		=> 'select', 
					'options'	=> array(
						'short_text'	=> Lang::get('Short Text'), 
						'long_text'		=> Lang::get('Long Text'), 
						'number'		=> Lang::get('Number'), 
						'date'			=> Lang::get('Date')
					)
				));
			}

			$form->addField(array(
				'name'		=> 'create_table', 
				'type'		=> 'hidden', 
				'value'		=> '1'
			));
			$form->addField(array(
				'name'		=> 'num_fields', 
				'type'		=> 'hidden', 
				'value'		=> $numFields
			));

			if (isset($_POST['create_table']) and $form->validate()) {
				redirect(msg('Table Created', 'The table was successfully created.'));
			}
			else {
				self::$tplVars['create_db_form'] = $form->asHTML();
			}
		}
	}
?>
