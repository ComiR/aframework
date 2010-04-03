--
-- Table structure for table `bt_sprints`
--

CREATE TABLE IF NOT EXISTS `bt_sprints` (
  `bt_sprints_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bt_sprints_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;
