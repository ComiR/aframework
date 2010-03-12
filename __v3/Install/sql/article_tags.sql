-- phpMyAdmin SQL Dump
-- version 3.2.2.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 12, 2010 at 10:59 AM
-- Server version: 5.1.37
-- PHP Version: 5.2.10-2ubuntu6.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `ante_aframework_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `article_tags`
--

CREATE TABLE IF NOT EXISTS `article_tags` (
  `article_tags_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `articles_id` int(10) unsigned NOT NULL,
  `tags_id` int(10) unsigned NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_tags_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `article_tags`
--

INSERT INTO `article_tags` (`article_tags_id`, `articles_id`, `tags_id`, `ts`) VALUES
(62, 18, 33, '2010-02-19 05:21:17'),
(57, 19, 33, '0000-00-00 00:00:00'),
(58, 20, 33, '0000-00-00 00:00:00');

