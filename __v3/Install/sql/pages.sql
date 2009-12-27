-- MySQL dump 10.13  Distrib 5.1.37, for debian-linux-gnu (i486)
--
-- Host: localhost    Database: afv3
-- ------------------------------------------------------
-- Server version	5.1.37-1ubuntu5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `pages_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url_str` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pub_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `in_navigation` tinyint(4) NOT NULL DEFAULT '1',
  `priority` int(11) NOT NULL DEFAULT '1',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `meta_keywords` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `meta_description` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  UNIQUE KEY `pages_id` (`pages_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (3,'example','2009-10-10 11:05:04',1,1,'Example Page','','','# An Example Page\r\n\r\nThis is just an aCMS exampel page. You can [login](/admin/) to edit or delete it.\r\n\r\nAlmost everything you create in aFramework is written in Markdown. Markdown is a super-simple markup language that translates to valid and, even more importantly, semantic HTML.\r\n\r\nThe following are some Markdown examples.\r\n\r\n## Markdown Examples\r\n\r\nAbove this paragraph (paragraphs are automatically turned in to <p>aragraphs) is an h2. An h2 is created by starting a line with two hash characters. Add more than two hash to create h3s and down.\r\n\r\nIf you want to highlight some text as being more important you can use two asterisk around the word(s) **like this**. If you want to emphasize a word use one underscore on each site; \"but mum, I _have_ washed my hands!\".\r\n\r\nA list is easily created by starting a line with an asterisk:\r\n\r\n**Buy some:**\r\n\r\n* Butter\r\n* Milk\r\n* Bread\r\n* Cheese\r\n* Sauna smoked ham\r\n\r\nTo create a numeric list simply start lines with a number followed by a dot:\r\n\r\n1. Open terminal\r\n2. Type `sudo apt-get install gnome-do`\r\n3. ???\r\n4. Profit\r\n\r\nLinks and images can be inserted using square brackets and parenthesis. The link text is placed in the brackets and the URL is placed in the parenthesis: [like this](http://www.google.com).\r\n\r\nImages are identical except they start with an exclamation point. Since images don\'t have a text what you put in the brackets is used for the alt-attribute.\r\n\r\n![AndreasLagerkvist.com\'s Logo](http://andreaslagerkvist.com/AndreasLagerkvist/Styles/darker/gfx/logo.png)\r\n\r\nFor more information about Markdown, head over to [the official Markdown website](http://markdown.com).'),(4,'__quickabout','2009-12-26 20:35:18',0,0,'Quick About','','','# About aFramework\r\n\r\n[aFramework](http://a-framework.org) is an open source, modular PHP web development framework.\r\n\r\nIts aim is to be as easy to use as possible for both developers and authors.\r\n\r\nTry out the [admin](/admin/) by loggin in with username: **admin**, password: **1234**.');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2009-12-27 20:47:47
