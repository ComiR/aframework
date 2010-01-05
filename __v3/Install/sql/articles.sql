
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
DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `articles_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url_str` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pub_date` datetime NOT NULL,
  `allow_comments` tinyint(4) NOT NULL,
  `allow_rating` tinyint(4) NOT NULL,
  `meta_keywords` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `meta_description` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `num_hits` int(10) unsigned NOT NULL DEFAULT '0',
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`articles_id`),
  UNIQUE KEY `articles_id` (`articles_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (18,'welcome-to-aframework','Welcome to aFramework','aFramework is a modular open source PHP web development framework that comes bundled with many useful modules.\r\n\r\n![](http://exscale.se/__files/uploads/monkey-con-banana.jpg)\r\n\r\nYou can easily create your own site and extend all the functionality from other aFramework sites to rapidly create a unique blog, forum, cms or whatever you can dream of.\r\n\r\nYou\'ll find a [style switcher](#style-switcher) on every page that allows you to switch between the styles aFramework comes bundled with. You can easily create your own style (or extend an existing) simply by creating a folder for your CSS and images in the Styles/ directory of your site.\r\n\r\nIn order to edit content on aFramework powered sites you need to log in. Simply visit [/admin/](/admin/) and enter username: **admin**, password: **1234**. After that articles, pages, comments etc will all become editable, right on the page.\r\n\r\nHope you enjoy aFramework and check [the official site](http://a-framework.org) often for updates. aFramework is constantly under development.\r\n\r\nRegards,  \r\nThe aFramework Team (me, Andreas Lagerkvist :)','2009-12-10 13:22:00',1,1,'','',0,'0000-00-00 00:00:00'),(19,'an-older-article','An Older Article','This article was published before the other one. It\'s only here to fill some of the modules with content.\r\n\r\n![](http://exscale.se/__files/uploads/thailand-1.jpg)\r\n\r\nToodle Pip!','2009-10-25 16:49:56',1,1,'','',0,'0000-00-00 00:00:00'),(20,'an-even-older-article','An Even Older Article','This one is even _older_ than \"An Older Article\". Lorem ipsum dolor sit amet.\r\n\r\n![](http://exscale.se/__styles/green-twigs/thumb.jpg)\r\n\r\nCiao','2007-12-25 17:00:00',0,0,'','',0,'0000-00-00 00:00:00');
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

