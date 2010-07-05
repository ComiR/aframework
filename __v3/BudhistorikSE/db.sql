-- phpMyAdmin SQL Dump
-- version 2.11.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 05, 2010 at 08:54 AM
-- Server version: 5.0.41
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `ante_budhistorik`
--

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` VALUES(4, '__quickabout', 0, 0, 'Quick About', '', '', 0x232056c3a46c6b6f6d6d656e2074696c6c20427564686973746f72696b2e7365210d0a0d0a215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6163636570742e706e6729205365642075742070657273706963696174697320756e6465206f6d6e69732069737465206e61747573206572726f722073697420766f6c7570746174656d206163637573616e7469756d2e0d0a0d0a557420656e696d206164206d696e696d612076656e69616d2c205b71756973206e6f737472756d5d28232920657865726369746174696f6e656d20756c6c616d20636f72706f726973207375736369706974206c61626f72696f73616d2c206e69736920757420616c697175696420657820656120636f6d6d6f646920636f6e7365717561747572205b646f6c6f72656d717565206c617564616e7469756d5d2823292c20746f74616d2072656d206170657269616d3f0d0a0d0a2a2020202323205b435441202a2a6e6f2e20312a2a5d2823290d0a0d0a20202020215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6374612d312e706e672920557420656e696d206164206d696e696d2076656e69616d2e0d0a0d0a2a2020202323205b435441202a2a6e6f2e20322a2a5d2823290d0a0d0a20202020215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6374612d322e706e67292044756973206175746520697275726520646f6c6f722e0d0a0d0a2a2020202323205b435441202a2a6e6f2e20332a2a5d2823290d0a0d0a20202020215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6374612d332e706e672920457820636f6d6d6f646f20636f6e7365717561742e, '2010-07-05 08:43:40');
INSERT INTO `pages` VALUES(7, '__home', 0, 0, 'Hem', '', '', 0x23205661642067c3b6722076693f0d0a0d0a215b5d282f427564686973746f72696b53452f46696c65732f6465636f7261746976652f6b65792e706e672920224c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e7365637465747572206164697069736963696e6720656c69742c2073656420646f20656975736d6f642074656d706f7220696e6369646964756e74207574206c61626f72652e220d0a0d0a557420656e696d206164206d696e696d2076656e69616d2c205b71756973206e6f737472756420657865726369746174696f6e5d28232920756c6c616d636f206c61626f726973206e69736920757420616c697175697020657820656120636f6d6d6f646f20636f6e7365717561742e2044756973206175746520697275726520646f6c6f7220696e20726570726568656e646572697420696e20766f6c7570746174652076656c697420657373652063696c6c756d20646f6c6f726520657520667567696174206e756c6c612070617269617475722e0d0a0d0a4578636570746575722073696e74206f6363616563617420637570696461746174205b6e6f6e2070726f6964656e745d2823292c2073756e7420696e2063756c706120717569206f666669636961206465736572756e74206d6f6c6c697420616e696d20696420657374206c61626f72756d2e, '2010-07-05 08:53:39');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

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
