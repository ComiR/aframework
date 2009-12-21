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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `articles_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url_str` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `pub_date` datetime NOT NULL,
  `allow_comments` tinyint(4) NOT NULL,
  `allow_rating` tinyint(4) NOT NULL,
  `meta_keywords` longtext NOT NULL,
  `meta_description` longtext NOT NULL,
  `num_hits` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`articles_id`),
  UNIQUE KEY `articles_id` (`articles_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'example','Example Article','This is just an aBlog example article. You can [login](::url|AdminLogin::) to edit or delete it.\r\n\r\nAlmost everything you create in aFramework is written in Markdown. Markdown is a super-simple markup language that translates to valid and, even more importantly, semantic HTML.\r\n\r\nThe following are some Markdown examples.\r\n\r\n## Markdown Examples\r\n\r\nAbove this paragraph (paragraphs are automatically turned in to <p>aragraphs) is an h1. An h1 is created by starting a line with one hash character. Add more than one hash to create h2s and down.\r\n\r\nIf you want to highlight some text as being more important you can use two asterisk around the word(s) **like this**. If you want to emphasize a word use one underscore on each site; \"but mum, I _have_ washed my hands!\".\r\n\r\nA list is easily created by starting a line with an asterisk:\r\n\r\n**Buy some:**\r\n\r\n* Butter\r\n* Milk\r\n* Bread\r\n* Cheese\r\n* Sauna smoked ham\r\n\r\nTo create a numeric list simply start lines with a number followed by a dot:\r\n\r\n1. Open terminal\r\n2. Type `sudo apt-get install gnome-do`\r\n3. ???\r\n4. Profit\r\n\r\nLinks and images can be inserted using square brackets and parenthesis. The link text is placed in the brackets and the URL is placed in the parenthesis: [like this](http://www.google.com).\r\n\r\nImages are identical except they start with an exclamation point. Since images don\'t have a text what you put in the brackets is used for the alt-attribute.\r\n\r\n![A picture of me](http://andreaslagerkvist.com/AndreasLagerkvist/Files/me.jpg)\r\n\r\nFor more information about Markdown, head over to [the official Markdown website](http://markdown.com).','2009-10-10 13:22:00',1,1,'','',0);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2009-12-21 11:22:52
