--
-- Table structure for table `bt_projects`
--

CREATE TABLE IF NOT EXISTS `bt_projects` (
  `bt_projects_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url_str` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bt_projects_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;
