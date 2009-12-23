-- phpMyAdmin SQL Dump
-- version 3.0.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 16, 2008 at 08:41 PM
-- Server version: 5.0.67
-- PHP Version: 5.3.0alpha3-dev

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `afv3`
--

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `pages_id` int(10) unsigned NOT NULL auto_increment,
  `url_str` varchar(255) NOT NULL,
  `pub_date` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `in_navigation` tinyint(4) NOT NULL default '1',
  `priority` int(11) NOT NULL default '1',
  `title` varchar(255) NOT NULL,
  `meta_keywords` longtext NOT NULL,
  `meta_description` longtext NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY  (`pages_id`),
  UNIQUE KEY `pages_id` (`pages_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`pages_id`, `url_str`, `pub_date`, `in_navigation`, `priority`, `title`, `meta_keywords`, `meta_description`, `content`) VALUES
(1, 'about', '2008-11-16 20:19:11', 1, 1, 'About', '', '', '# About\r\n\r\nThis is an example page. Edit or delete it.');
