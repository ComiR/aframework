-- phpMyAdmin SQL Dump
-- version 3.0.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 16, 2008 at 11:31 PM
-- Server version: 5.0.67
-- PHP Version: 5.3.0alpha3-dev

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `afv3`
--

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE IF NOT EXISTS `links` (
  `links_id` int(10) unsigned NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY  (`links_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`links_id`, `title`, `description`, `url`) VALUES
(1, 'AndreasLagerkvist.com', 'Andreas Lagerkvist''s personal blog.', 'http://andreaslagerkvist.com'),
(2, 'aFramework', 'A simple, modular, ajax-ready, accessible PHP framework.', 'http://aframework.pixlperfik.com');