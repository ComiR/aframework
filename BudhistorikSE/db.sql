-- phpMyAdmin SQL Dump
-- version 2.11.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 16, 2010 at 10:19 AM
-- Server version: 5.0.41
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `budhistorik`
--

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

CREATE TABLE `bids` (
  `bids_id` int(10) unsigned NOT NULL auto_increment,
  `users_id` int(10) unsigned NOT NULL,
  `objects_id` int(10) unsigned NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `id_number` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `active` tinyint(4) NOT NULL,
  `pub_date` datetime NOT NULL,
  `ts` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`bids_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `bids`
--

INSERT INTO `bids` VALUES(1, 1, 3, 'Pernilla', 'Gudrunson', '19570610-4582', '08-1874932', 1750000, 1, '2010-08-06 14:26:32', '2010-08-12 14:04:51');
INSERT INTO `bids` VALUES(2, 2, 2, 'Joel', 'Andersson', '19780315-8956', '0920-648399', 1600000, 1, '2010-08-07 14:27:26', '2010-08-06 14:27:31');
INSERT INTO `bids` VALUES(3, 1, 3, 'Pelle', 'Persson', '3123ah', '0702562423', 1800000, 1, '2010-08-12 13:53:53', '2010-08-16 10:16:48');

-- --------------------------------------------------------

--
-- Table structure for table `objects`
--

CREATE TABLE `objects` (
  `objects_id` int(10) unsigned NOT NULL auto_increment,
  `users_id` int(10) unsigned NOT NULL,
  `address` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `apartment_num` varchar(255) NOT NULL,
  `starting_price` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `sold` tinyint(1) NOT NULL,
  `description` longtext NOT NULL,
  `url` varchar(255) NOT NULL,
  `ts` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`objects_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `objects`
--

INSERT INTO `objects` VALUES(1, 2, 'Kungsgatan 27', '11354', 'Stockholm', '6', 1000000, '2010-08-09 14:22:13', '2010-09-23 14:22:18', 0, 'Fin lägga vid bäcken som rinner genom byn', 'http:/claes.gorans.se/obj/34764', '2010-08-06 14:24:09');
INSERT INTO `objects` VALUES(2, 2, 'Kungsgatan 63', '13354', 'Stockholm', '7', 1500000, '2010-08-19 14:23:32', '2010-10-11 14:23:37', 0, 'Lorem ipsum', 'http:/claes.gorans.se/obj/3285', '2010-08-06 14:24:09');
INSERT INTO `objects` VALUES(3, 1, 'Ringvägen 13', '13472', 'Stockholm', '1952', 1250000, '2010-08-03 14:24:49', '2011-09-08 14:24:54', 0, 'Liten beskrivning', 'http://aftonhoran.com', '2010-08-16 10:16:24');

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE `offices` (
  `offices_id` int(10) unsigned NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `address` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `fax` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `official_id` int(10) unsigned NOT NULL,
  `ts` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`offices_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` VALUES(1, 'Erik Olsson', 'Lorem ipsum dolor sit amet. Consequeteur lipsumus dolirumus.', 'Blomgatan 12', '113 54', 'Stockholm', '08 545 321', '08 545 320', 'hej@erikolsson.se', 'http://erikolsson.se', 12, '2010-07-08 21:28:12');
INSERT INTO `offices` VALUES(2, 'Claes Görans', 'En liten beskrivning av firman', 'Ninjavägen 23', '98462', 'Tammerfors', '0624730528', '0624730528', 'info@claes.gorans.se', 'claes.gorans.se', 9306, '2010-08-06 14:18:48');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `pages_id` int(10) unsigned NOT NULL auto_increment,
  `url_str` varchar(255) character set utf8 collate utf8_bin NOT NULL,
  `in_navigation` tinyint(4) NOT NULL default '1',
  `priority` int(11) NOT NULL default '1',
  `title` varchar(255) character set utf8 collate utf8_bin NOT NULL,
  `meta_keywords` longtext character set utf8 collate utf8_bin NOT NULL,
  `meta_description` longtext character set utf8 collate utf8_bin NOT NULL,
  `content` longtext character set utf8 collate utf8_bin NOT NULL,
  `ts` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  UNIQUE KEY `pages_id` (`pages_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` VALUES(4, '__quickabout', 0, 0, 'Quick About', '', '', 0x232056c3a46c6b6f6d6d656e2074696c6c20427564686973746f72696b2e7365210d0a0d0a215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6163636570742e706e67292056692074696c6c68616e646168c3a56c6c65722067726174697320627564686973746f72696b2070c3a5206f626a656b74206672c3a56e20c3b676657220313030206f6c696b61206dc3a46b6c6172627972c3a56572206f636820343030206dc3a46b6c6172652e0d0a0d0a48c3a472206b616e20647520736f6d206bc3b6706172652076657269666965726120627564686973746f72696b656e2070c3a52064696e206e7961206cc3a467656e68657420656c6c65722076696c6c612e20416e76c3a46e642073c3b66b656e2066c3b672206174742066696e6e612064696e206164726573732e0d0a0d0a2a2020202323205b46c3b672202a2a6bc3b6706172652a2a5d282f6b6f706172652f290d0a0d0a20202020215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6374612d312e706e67292056657269666965726120627564686973746f72696b656e2070c3a52064697474206e796bc3b670210d0a0d0a2a2020202323205b46c3b672202a2a73c3a46c6a6172652a2a5d282f73616c6a6172652f290d0a0d0a20202020215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6374612d322e706e6729204ec3a5676f7420736f6d2066c3a57220656e2073c3a46c6a61726520617474206b6c69636b612068c3a472210d0a0d0a2a2020202323205b46c3b672202a2a6dc3a46b6c6172652a2a5d282f6d616b6c6172652f290d0a0d0a20202020215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6374612d332e706e672920426c69206d65646c656d2069646167206f63682066c3a5206ec3b66a64617265206b756e64657220646972656b7421, '2010-08-12 12:55:01');
INSERT INTO `pages` VALUES(7, '__home', 0, 0, 'Hem', '', '', 0x23205661642067c3b6722076693f0d0a0d0a215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6b65792e706e672920224c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e7365637465747572206164697069736963696e6720656c69742c2073656420646f20656975736d6f642074656d706f7220696e6369646964756e74207574206c61626f72652e220d0a0d0a557420656e696d206164206d696e696d2076656e69616d2c205b71756973206e6f737472756420657865726369746174696f6e5d28232920756c6c616d636f206c61626f726973206e69736920757420616c697175697020657820656120636f6d6d6f646f20636f6e7365717561742e2044756973206175746520697275726520646f6c6f7220696e20726570726568656e646572697420696e20766f6c7570746174652076656c697420657373652063696c6c756d20646f6c6f726520657520667567696174206e756c6c612070617269617475722e0d0a0d0a4578636570746575722073696e74206f6363616563617420637570696461746174205b6e6f6e2070726f6964656e745d2823292c2073756e7420696e2063756c706120717569206f666669636961206465736572756e74206d6f6c6c697420616e696d20696420657374206c61626f72756d2e, '2010-07-05 08:53:39');
INSERT INTO `pages` VALUES(10, 'for-kopare', 0, 0, 'För köpare', '', '', 0x232046c3b6722064696720736f6d20c3a472206bc3b6706172650d0a0d0a4c6f72656d20697073756d20646f6c6f722073697420616d65742e, '2010-08-16 10:19:33');
INSERT INTO `pages` VALUES(11, 'for-saljare', 0, 0, 'För säljare', '', '', 0x232046c3b6722064696720736f6d20c3a4722073c3a46c6a6172650d0a0d0a4c6f72656d20697073756d20646f6c6f722e, '2010-08-16 10:19:39');
INSERT INTO `pages` VALUES(12, 'for-maklare', 1, 0, 'För mäklare', '', '', 0x232046c3b6722064696720736f6d20c3a472206dc3a46b6c6172650d0a0d0a4c6f72656d20697073756d20646f6c6f722073697420616d65742e, '2010-08-16 10:19:46');

-- --------------------------------------------------------

--
-- Table structure for table `revisions`
--

CREATE TABLE `revisions` (
  `revisions_id` int(10) unsigned NOT NULL auto_increment,
  `table_id` int(10) unsigned NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `pub_date` datetime NOT NULL,
  `content` longtext NOT NULL,
  `ts` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`revisions_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `revisions`
--

INSERT INTO `revisions` VALUES(1, 7, 'pages', '2010-07-05 01:33:07', '# Lorem Ipsum\r\n\r\n"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', '2010-07-05 01:33:07');
INSERT INTO `revisions` VALUES(2, 4, 'pages', '2010-07-05 02:02:56', '# Välkommen till Budhistorik.se!\r\n\r\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', '2010-07-05 02:02:56');
INSERT INTO `revisions` VALUES(3, 7, 'pages', '2010-07-05 02:05:47', '# Lorem Ipsum\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', '2010-07-05 02:05:47');
INSERT INTO `revisions` VALUES(4, 4, 'pages', '2010-07-05 02:27:11', '* [Hem](#header)\r\n* [Om oss](#page)\r\n* [Kontakt](#contact)\r\n\r\n# Välkommen till Budhistorik.se!\r\n\r\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', '2010-07-05 02:27:11');
INSERT INTO `revisions` VALUES(5, 4, 'pages', '2010-07-05 02:38:09', '* [Hem](#wrapper)\r\n* [Om oss](#page)\r\n* [Kontakt](#contact)\r\n\r\n# Välkommen till Budhistorik.se!\r\n\r\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', '2010-07-05 02:38:09');
INSERT INTO `revisions` VALUES(6, 4, 'pages', '2010-07-05 02:40:54', '* [Hem](#wrapper)\r\n* [Om oss](#page)\r\n* [Kontakt](#contact)\r\n\r\n# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.', '2010-07-05 02:40:54');
INSERT INTO `revisions` VALUES(7, 4, 'pages', '2010-07-05 02:41:50', '* [Hem](#wrapper)\r\n* [Om oss](#page)\r\n* [Kontakt](#contact)\r\n\r\n# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', '2010-07-05 02:41:50');
INSERT INTO `revisions` VALUES(8, 4, 'pages', '2010-07-05 06:50:35', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', '2010-07-05 06:50:35');
INSERT INTO `revisions` VALUES(9, 4, 'pages', '2010-07-05 06:59:53', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?\r\n\r\n*   ## [CTO **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cto-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTO **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cto-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTO **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cto-3.png) Ex commodo consequat.', '2010-07-05 06:59:53');
INSERT INTO `revisions` VALUES(10, 4, 'pages', '2010-07-05 07:31:08', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 07:31:08');
INSERT INTO `revisions` VALUES(11, 7, 'pages', '2010-07-05 07:51:02', '# Lorem Ipsum\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', '2010-07-05 07:51:02');
INSERT INTO `revisions` VALUES(12, 7, 'pages', '2010-07-05 07:51:51', '# Lorem Ipsum\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 07:51:51');
INSERT INTO `revisions` VALUES(13, 7, 'pages', '2010-07-05 07:52:26', '# Lorem Ipsum\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 07:52:26');
INSERT INTO `revisions` VALUES(14, 7, 'pages', '2010-07-05 07:52:54', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 07:52:54');
INSERT INTO `revisions` VALUES(15, 4, 'pages', '2010-07-05 07:57:15', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur doloremque laudantium, totam rem aperiam?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 07:57:15');
INSERT INTO `revisions` VALUES(16, 4, 'pages', '2010-07-05 08:42:36', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error [sit voluptatem](#) accusantium.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut [aliquid ex ea](#) commodi consequatur doloremque laudantium, totam rem aperiam?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 08:42:36');
INSERT INTO `revisions` VALUES(17, 7, 'pages', '2010-07-05 08:42:53', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, [quis nostrud exercitation](#) ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat [non proident](#), sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 08:42:53');
INSERT INTO `revisions` VALUES(18, 4, 'pages', '2010-07-05 08:43:40', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.\r\n\r\nUt enim ad minima veniam, [quis nostrum](#) exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur [doloremque laudantium](#), totam rem aperiam?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 08:43:40');
INSERT INTO `revisions` VALUES(19, 7, 'pages', '2010-07-05 08:53:09', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, [quis nostrud exercitation](#) ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat [non proident](#), sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 08:53:09');
INSERT INTO `revisions` VALUES(20, 7, 'pages', '2010-07-05 08:53:16', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, [quis nostrud exercitation](#) ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat [non proident](#), sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 08:53:16');
INSERT INTO `revisions` VALUES(21, 4, 'pages', '2010-08-12 12:51:02', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Vi tillhandahåller gratis budhistorik på objekt från över 100 olika mäklarbyråer och 400 mäklare.\r\n\r\nHär kan du som köpare verifiera budhistoriken på din nya lägenhet eller villa. Använd söken för att finna din adress.\r\n\r\n*   ## [För **köpare**](/kopare/)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Verifiera budhistoriken på ditt nyköp!\r\n\r\n*   ## [För **säljare**](/saljare/)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Stämmer mäklarens budhistorik överens med vår?\r\n\r\n*   ## [För **mäklare**](/maklare/)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Är inte er byrå med i vårat register? Gå med idag!', '2010-08-12 12:51:02');
INSERT INTO `revisions` VALUES(22, 4, 'pages', '2010-08-12 12:55:01', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Vi tillhandahåller gratis budhistorik på objekt från över 100 olika mäklarbyråer och 400 mäklare.\r\n\r\nHär kan du som köpare verifiera budhistoriken på din nya lägenhet eller villa. Använd söken för att finna din adress.\r\n\r\n*   ## [För **köpare**](/kopare/)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Verifiera budhistoriken på ditt nyköp!\r\n\r\n*   ## [För **säljare**](/saljare/)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Något som får en säljare att klicka här!\r\n\r\n*   ## [För **mäklare**](/maklare/)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Bli medlem idag och få nöjdare kunder direkt!', '2010-08-12 12:55:01');
INSERT INTO `revisions` VALUES(23, 8, 'pages', '2010-08-12 13:02:26', '# Administrera objekt\r\n\r\nHär kan du administrera samt lägga upp nya objekt och bud.\r\n\r\nKlicka på ett objekt för att få detaljer. Håll musen över ikonerna till höger för att få en förklaring.', '2010-08-12 13:02:26');
INSERT INTO `revisions` VALUES(24, 9, 'pages', '2010-08-12 13:06:37', '# Administrera/lägg till objekt\r\n\r\nHär kan du lägga till eller ändra ett objekt. I botten av sidan kan du lägga till eller ta bort bud på objektet.', '2010-08-12 13:06:37');
INSERT INTO `revisions` VALUES(25, 8, 'pages', '2010-08-12 13:06:46', '# Administrera alla objekt\r\n\r\nHär kan du administrera samt lägga upp nya objekt och bud.\r\n\r\nKlicka på ett objekt för att få detaljer. Håll musen över ikonerna till höger för att få en förklaring.', '2010-08-12 13:06:46');
INSERT INTO `revisions` VALUES(26, 10, 'pages', '2010-08-16 10:18:07', '# För dig som är köpare\r\n\r\nLorem ipsum dolor sit amet.', '2010-08-16 10:18:07');
INSERT INTO `revisions` VALUES(27, 11, 'pages', '2010-08-16 10:18:28', '# För dig som är säljare\r\n\r\nLorem ipsum dolor.', '2010-08-16 10:18:28');
INSERT INTO `revisions` VALUES(28, 12, 'pages', '2010-08-16 10:18:46', '# För dig som är mäklare\r\n\r\nLorem ipsum dolor sit amet.', '2010-08-16 10:18:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` int(10) unsigned NOT NULL auto_increment,
  `offices_id` int(10) unsigned NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `official_id` int(10) unsigned NOT NULL,
  `ts` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`users_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES(1, 1, 'erik', '72e84751cc2bc10e8953dfd5e18ab7b8', 'Erik', 'Olsson', 'Han är king', '0702452232', 'erik@erikolsson.se', 'Stockholm', 45, '2010-08-12 12:58:20');
INSERT INTO `users` VALUES(2, 2, 'claes', '74d39d16ccd8128184800880e529db76', 'Claes', 'Ohlsson', 'Har två varningar', '0624730528', 'claes@claes.gorans.se', 'Tammerfors', 1235, '2010-08-12 12:59:01');
INSERT INTO `users` VALUES(3, 2, 'goran', '3554ca17f79e3dc208e05dd91e460727', 'Göran', 'Ohlsson', '', '060-3486717', 'goran@claes.goran.se', 'Tammerfors', 1251, '2010-08-12 12:59:27');
