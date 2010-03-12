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
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comments_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `articles_id` int(10) unsigned NOT NULL,
  `karma` tinyint(3) NOT NULL,
  `ip` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `website` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pub_date` datetime NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comments_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3092 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comments_id`, `articles_id`, `karma`, `ip`, `author`, `email`, `website`, `content`, `pub_date`, `ts`) VALUES
(3070, 18, 1, '127.0.0.1', 'Herr aFramework', 'admin@aframework.org', 'http://aframework.org', 0x54686973206973206a75737420616e206578616d706c6520636f6d6d656e742e20596f752063616e205b6c6f67696e5d282f61646d696e2f2920746f2065646974206f722064656c6574652069742e, '2009-10-10 13:23:33', '0000-00-00 00:00:00');

