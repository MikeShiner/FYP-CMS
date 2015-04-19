-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2015 at 07:47 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cl49-cms-h1t`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_entries`
--

CREATE TABLE IF NOT EXISTS `blog_entries` (
`id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=ascii;

--
-- Dumping data for table `blog_entries`
--

INSERT INTO `blog_entries` (`id`, `time`, `title`, `content`) VALUES
(1, '2015-03-25 14:55:23', 'Test Title', 'This is a blog test!'),
(2, '2015-03-25 14:56:00', 'Test 3', 'This is a test for number 3!'),
(3, '2015-03-25 14:57:42', 'Test 4', 'This is a test for number 4!'),
(4, '2015-03-25 14:57:42', 'Test 5', 'This is a test for number 5!'),
(5, '2015-03-25 14:57:42', 'Test 6', 'This is a test for number 6!'),
(6, '2015-03-25 14:57:42', 'Test 7', 'This is a test for number 7!'),
(7, '2015-03-25 14:57:42', 'Test 8', 'This is a test for number 8!'),
(8, '2015-03-25 14:57:42', 'Test 9', 'This is a test for number 9!'),
(9, '2015-03-25 14:57:42', 'Test 10', 'This is a test for number 10!'),
(10, '2015-03-25 14:57:42', 'Test 11', 'This is a test for number 11!'),
(11, '2015-03-25 14:57:42', 'Test 12', 'This is a test for number 12!');

-- --------------------------------------------------------

--
-- Table structure for table `calendar-events`
--

CREATE TABLE IF NOT EXISTS `calendar-events` (
`id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(15) NOT NULL,
  `description` text,
  `time` time DEFAULT NULL,
  `date` date DEFAULT NULL,
  `duration` int(2) DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calendar-events`
--

INSERT INTO `calendar-events` (`id`, `name`, `type`, `description`, `time`, `date`, `duration`, `public`) VALUES
(1, 'Public Rehearsal', 'rehearsal', 'Public rehearsal for all to attend. Feel free to bring a friend.', '16:15:00', '2015-02-13', 1, 1),
(2, 'Choir Practice', 'practice', 'Normal practice', '15:30:00', '2015-02-13', 1, 0),
(3, 'Sponsored Swim', 'sponsor', 'Sponsored swim by Lions Club at New Milton Recreation Centre, please come see us at anytime.', '16:00:00', '2015-02-28', 2, 1),
(9, 'April TEST', 'Rehearsal', 'This is a text rehearsal for April.', '15:00:00', '2015-04-15', 1, 1),
(10, 'BUG TEST', 'Rehearsal', 'ERROR', '15:00:00', '2014-03-12', 1, 1),
(18, 'Test 1', 'Rehearsal', 'Hello test 1', '12:43:00', '2015-03-18', 1, 1),
(22, 'TEST Abert hall', 'Performance', 'Desc', '15:40:00', '2015-01-03', 1, 1),
(30, 'TEST Choir Practice', 'Performance', 'Hello test 1', '12:43:00', '2015-03-12', 1, 1),
(31, 'Test 2', 'Performance', 'Test 2', '12:00:00', '2015-02-03', 1, 1),
(34, 'MEGA TEST', 'Fundraising', '\\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\\"', '12:20:00', '2015-03-22', 2, 1),
(35, 'TEST Choir Practice', 'Performance', 'Hello test 1', '12:43:00', '2015-03-18', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `page_content`
--

CREATE TABLE IF NOT EXISTS `page_content` (
`id` int(100) NOT NULL,
  `pos` int(100) DEFAULT NULL,
  `content_type` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `page` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page_content`
--

INSERT INTO `page_content` (`id`, `pos`, `content_type`, `content`, `page`) VALUES
(1, 1, 'H3', 'Welcome to Highcliffe Youth Choir <br>', 'Home'),
(2, 2, 'P', 'The Choir exists to give young people aged between 7 and 18 the opportunity to enjoy singing together to the        highest possible standard, giving pleasure to others and furthering our choral tradition. The Choir performs        frequently in the local area, singing Christmas Carols in popular and prestigious venues such as Beaulieu Abbey,        The Chewton Glen Hotel, The Christchurch Harbour Hotel, and the Captains Club Hotel in Christchurch, as well as       concerts at places like Poole Lighthouse Theatre.<br>', 'Home'),
(4, 1, 'H3', 'Heading for Recruitment', 'Recruitment'),
(5, 2, 'P', 'Paragraph for Recruitment', 'Recruitment'),
(6, 1, 'H3', 'Blog Title Here', 'Blog'),
(7, 2, 'P', 'Paragraph for Blog space', 'Blog'),
(8, 1, 'H3', 'Events Title', 'Events'),
(9, 2, 'P', 'Events Paragraph Write something for the event paragraph<br>', 'Events');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_entries`
--
ALTER TABLE `blog_entries`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calendar-events`
--
ALTER TABLE `calendar-events`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_content`
--
ALTER TABLE `page_content`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_entries`
--
ALTER TABLE `blog_entries`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `calendar-events`
--
ALTER TABLE `calendar-events`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `page_content`
--
ALTER TABLE `page_content`
MODIFY `id` int(100) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
