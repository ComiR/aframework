--
-- Table structure for table `bt_tasks`
--

CREATE TABLE IF NOT EXISTS `bt_tasks` (
  `bt_tasks_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bt_projects_id` int(10) unsigned NOT NULL,
  `url_str` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `assigned` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `priority` enum('Idea','Must Have','Urgent') NOT NULL,
  `state` enum('New','In Progress','Done') NOT NULL,
  `pub_date` datetime NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bt_tasks_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=105 ;
