-- phpMyAdmin SQL Dump
-- version 3.3.2deb1
-- http://www.phpmyadmin.net
--
-- Värd: localhost
-- Skapad: 06 augusti 2010 kl 14:28
-- Serverversion: 5.1.41
-- PHP-version: 5.3.2-1ubuntu4.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databas: `budhistorik`
--

-- --------------------------------------------------------

--
-- Struktur för tabell `bids`
--

CREATE TABLE IF NOT EXISTS `bids` (
  `bids_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `users_id` int(10) unsigned NOT NULL,
  `objects_id` int(10) unsigned NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `id_number` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `active` tinyint(4) NOT NULL,
  `pub_date` datetime NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bids_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Data i tabell `bids`
--

INSERT INTO `bids` (`bids_id`, `users_id`, `objects_id`, `first_name`, `last_name`, `id_number`, `phone`, `amount`, `active`, `pub_date`, `ts`) VALUES
(1, 1, 3, 'Pernilla', 'Gudrunson', '19570610-4582', '08-1874932', 1750000, 1, '2010-08-06 14:26:32', '2010-08-06 14:27:31'),
(2, 2, 2, 'Joel', 'Andersson', '19780315-8956', '0920-648399', 1600000, 1, '2010-08-07 14:27:26', '2010-08-06 14:27:31');

-- --------------------------------------------------------

--
-- Struktur för tabell `objects`
--

CREATE TABLE IF NOT EXISTS `objects` (
  `objects_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`objects_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Data i tabell `objects`
--

INSERT INTO `objects` (`objects_id`, `users_id`, `address`, `postal_code`, `city`, `apartment_num`, `starting_price`, `start_date`, `end_date`, `sold`, `description`, `url`, `ts`) VALUES
(1, 2, 'Kungsgatan 27', '11354', 'Stockholm', '6', 1000000, '2010-08-09 14:22:13', '2010-09-23 14:22:18', 0, 'Fin lägga vid bäcken som rinner genom byn', 'http:/claes.gorans.se/obj/34764', '2010-08-06 14:24:09'),
(2, 2, 'Kungsgatan 63', '13354', 'Stockholm', '7', 1500000, '2010-08-19 14:23:32', '2010-10-11 14:23:37', 0, 'Lorem ipsum', 'http:/claes.gorans.se/obj/3285', '2010-08-06 14:24:09'),
(3, 1, 'Ringvägen 13', '13472', 'Stockholm', '1952', 1250000, '2010-08-01 14:24:49', '2011-09-01 14:24:54', 0, 'Liten beskrivning', 'http://aftonhoran.se', '2010-08-06 14:25:24');

-- --------------------------------------------------------

--
-- Struktur för tabell `offices`
--

CREATE TABLE IF NOT EXISTS `offices` (
  `offices_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`offices_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Data i tabell `offices`
--

INSERT INTO `offices` (`offices_id`, `title`, `description`, `address`, `postal_code`, `city`, `phone`, `fax`, `email`, `website`, `official_id`, `ts`) VALUES
(1, 'Erik Olsson', 'Lorem ipsum dolor sit amet. Consequeteur lipsumus dolirumus.', 'Blomgatan 12', '113 54', 'Stockholm', '08 545 321', '08 545 320', 'hej@erikolsson.se', 'http://erikolsson.se', 12, '2010-07-08 21:28:12'),
(2, 'Claes Görans', 'En liten beskrivning av firman', 'Ninjavägen 23', '98462', 'Tammerfors', '0624730528', '0624730528', 'info@claes.gorans.se', 'claes.gorans.se', 9306, '2010-08-06 14:18:48');

-- --------------------------------------------------------

--
-- Struktur för tabell `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `pages_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url_str` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `in_navigation` tinyint(4) NOT NULL DEFAULT '1',
  `priority` int(11) NOT NULL DEFAULT '1',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `meta_keywords` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `meta_description` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `pages_id` (`pages_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Data i tabell `pages`
--

INSERT INTO `pages` (`pages_id`, `url_str`, `in_navigation`, `priority`, `title`, `meta_keywords`, `meta_description`, `content`, `ts`) VALUES
(4, '__quickabout', 0, 0, 'Quick About', '', '', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.\r\n\r\nUt enim ad minima veniam, [quis nostrum](#) exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur [doloremque laudantium](#), totam rem aperiam?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 08:43:40'),
(7, '__home', 0, 0, 'Hem', '', '', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, [quis nostrud exercitation](#) ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat [non proident](#), sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 08:53:39');

-- --------------------------------------------------------

--
-- Struktur för tabell `revisions`
--

CREATE TABLE IF NOT EXISTS `revisions` (
  `revisions_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `table_id` int(10) unsigned NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `pub_date` datetime NOT NULL,
  `content` longtext NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`revisions_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Data i tabell `revisions`
--

INSERT INTO `revisions` (`revisions_id`, `table_id`, `table_name`, `pub_date`, `content`, `ts`) VALUES
(1, 7, 'pages', '2010-07-05 01:33:07', '# Lorem Ipsum\r\n\r\n"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', '2010-07-05 01:33:07'),
(2, 4, 'pages', '2010-07-05 02:02:56', '# Välkommen till Budhistorik.se!\r\n\r\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', '2010-07-05 02:02:56'),
(3, 7, 'pages', '2010-07-05 02:05:47', '# Lorem Ipsum\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', '2010-07-05 02:05:47'),
(4, 4, 'pages', '2010-07-05 02:27:11', '* [Hem](#header)\r\n* [Om oss](#page)\r\n* [Kontakt](#contact)\r\n\r\n# Välkommen till Budhistorik.se!\r\n\r\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', '2010-07-05 02:27:11'),
(5, 4, 'pages', '2010-07-05 02:38:09', '* [Hem](#wrapper)\r\n* [Om oss](#page)\r\n* [Kontakt](#contact)\r\n\r\n# Välkommen till Budhistorik.se!\r\n\r\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', '2010-07-05 02:38:09'),
(6, 4, 'pages', '2010-07-05 02:40:54', '* [Hem](#wrapper)\r\n* [Om oss](#page)\r\n* [Kontakt](#contact)\r\n\r\n# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.', '2010-07-05 02:40:54'),
(7, 4, 'pages', '2010-07-05 02:41:50', '* [Hem](#wrapper)\r\n* [Om oss](#page)\r\n* [Kontakt](#contact)\r\n\r\n# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', '2010-07-05 02:41:50'),
(8, 4, 'pages', '2010-07-05 06:50:35', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', '2010-07-05 06:50:35'),
(9, 4, 'pages', '2010-07-05 06:59:53', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?\r\n\r\n*   ## [CTO **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cto-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTO **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cto-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTO **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cto-3.png) Ex commodo consequat.', '2010-07-05 06:59:53'),
(10, 4, 'pages', '2010-07-05 07:31:08', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 07:31:08'),
(11, 7, 'pages', '2010-07-05 07:51:02', '# Lorem Ipsum\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', '2010-07-05 07:51:02'),
(12, 7, 'pages', '2010-07-05 07:51:51', '# Lorem Ipsum\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 07:51:51'),
(13, 7, 'pages', '2010-07-05 07:52:26', '# Lorem Ipsum\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 07:52:26'),
(14, 7, 'pages', '2010-07-05 07:52:54', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 07:52:54'),
(15, 4, 'pages', '2010-07-05 07:57:15', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur doloremque laudantium, totam rem aperiam?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 07:57:15'),
(16, 4, 'pages', '2010-07-05 08:42:36', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error [sit voluptatem](#) accusantium.\r\n\r\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut [aliquid ex ea](#) commodi consequatur doloremque laudantium, totam rem aperiam?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 08:42:36'),
(17, 7, 'pages', '2010-07-05 08:42:53', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, [quis nostrud exercitation](#) ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat [non proident](#), sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 08:42:53'),
(18, 4, 'pages', '2010-07-05 08:43:40', '# Välkommen till Budhistorik.se!\r\n\r\n![](/BudhistorikSE/Files/decorative/accept.png) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.\r\n\r\nUt enim ad minima veniam, [quis nostrum](#) exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur [doloremque laudantium](#), totam rem aperiam?\r\n\r\n*   ## [CTA **no. 1**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-1.png) Ut enim ad minim veniam.\r\n\r\n*   ## [CTA **no. 2**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-2.png) Duis aute irure dolor.\r\n\r\n*   ## [CTA **no. 3**](#)\r\n\r\n    ![](/BudhistorikSE/Files/decorative/cta-3.png) Ex commodo consequat.', '2010-07-05 08:43:40'),
(19, 7, 'pages', '2010-07-05 08:53:09', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, [quis nostrud exercitation](#) ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat [non proident](#), sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 08:53:09'),
(20, 7, 'pages', '2010-07-05 08:53:16', '# Vad gör vi?\r\n\r\n![](/BudhistorikSE/Files/decorative/key.png) "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."\r\n\r\nUt enim ad minim veniam, [quis nostrud exercitation](#) ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat [non proident](#), sunt in culpa qui officia deserunt mollit anim id est laborum.', '2010-07-05 08:53:16');

-- --------------------------------------------------------

--
-- Struktur för tabell `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `users_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`users_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Data i tabell `users`
--

INSERT INTO `users` (`users_id`, `offices_id`, `username`, `password`, `first_name`, `last_name`, `description`, `phone`, `email`, `city`, `official_id`, `ts`) VALUES
(1, 1, 'erik', 'detloservi', 'Erik', 'Olsson', 'Han är king', '0702452232', 'erik@erikolsson.se', 'Stockholm', 45, '2010-07-08 22:27:10'),
(2, 2, 'claes', 'claes', 'Claes', 'Ohlsson', 'Har två varningar', '0624730528', 'claes@claes.gorans.se', 'Tammerfors', 1235, '2010-08-06 14:21:06'),
(3, 2, 'goran', 'goran', 'Göran', 'Ohlsson', '', '060-3486717', 'goran@claes.goran.se', 'Tammerfors', 1251, '2010-08-06 14:21:06');
