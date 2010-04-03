--
-- Table structure for table `bt_sprint_tasks`
--

CREATE TABLE IF NOT EXISTS `bt_sprint_tasks` (
  `bt_sprint_tasks_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bt_sprints_id` int(10) unsigned NOT NULL,
  `bt_tasks_id` int(10) unsigned NOT NULL,
  `date_fixed` datetime NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bt_sprint_tasks_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=58 ;
