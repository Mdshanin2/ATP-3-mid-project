-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2020 at 09:39 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketplace`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `fname`, `username`, `password`, `email`, `phone`, `address`) VALUES
(1, 'Md shanin', 'shanin', '123', 'shanin@gmail.com', 1354534766, 'uttara dhaka');

-- --------------------------------------------------------

--
-- Table structure for table `buyer`
--

CREATE TABLE `buyer` (
  `id` int(10) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buyer`
--

INSERT INTO `buyer` (`id`, `fname`, `username`, `password`, `email`, `phone`, `address`) VALUES
(1, 'sumaiya sultana', 'sumaiya', '234', 'sumaiya@gmail.com', 1354539786, 'dhanmondi 4 road:3 house:2 4thfloor');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(10) NOT NULL COMMENT '1',
  `message` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `username` varchar(30) NOT NULL,
  `Admin_Username` varchar(11) NOT NULL,
  `reply` varchar(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id_chat`, `message`, `date`, `username`, `Admin_Username`, `reply`) VALUES
(18, 'weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', '2020-11-10', 'Sumaiya', 'shanin', 'Sumaiya'),
(20, 'qwqqw', '0000-00-00', 'shanin', 'shanin', 'Sumaiya'),
(21, 'qwqqwwwwwwwwwwwwwwwww', '2020-11-23', 'shanin', 'shanin', 'Sumaiya'),
(22, '111111111111111111', '2020-11-02', 'Sumaiya', 'shanin', 'Sumaiya'),
(23, '222222222222222222222', '2020-11-03', 'Sumaiya', 'shanin', 'Sumaiya'),
(26, '555555555555555555', '2020-11-11', 'abir', 'shanin', 'abir'),
(30, 'Good night admin', '2020-11-23', 'adsd', 'shanin', 'adsd'),
(32, 'g', '2020-11-23', 'Sumaiya', 'shanin', 'shanin'),
(33, 'hy', '2020-11-23', 'shanin', 'abir', 'abir'),
(34, 'hy', '2020-11-23', 'abir', 'shanin', 'abir'),
(35, 'hello', '2020-11-23', 'shanin', 'abir', 'abir'),
(36, 'hello', '2020-11-23', 'abir', 'shanin', 'shanin'),
(37, 'good', '2020-11-23', 'abir', 'shanin', 'abir'),
(38, 'hello', '2020-11-23', 'abir', 'shanin', 'abir');

-- --------------------------------------------------------

--
-- Table structure for table `freelancer`
--

CREATE TABLE `freelancer` (
  `id` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `freelancer`
--

INSERT INTO `freelancer` (`id`, `fname`, `username`, `password`, `email`, `phone`, `address`) VALUES
(1, 'abir islam', 'abir', '456', 'abir@gmail.com', 1354536547, 'mirpur: 7, road:36, house:3, 4thfloor'),
(2, 'adsd', 'sda', 'eqwe', 'asda', 213, 'asdsad');

-- --------------------------------------------------------

--
-- Table structure for table `job_list`
--

CREATE TABLE `job_list` (
  `id` int(200) NOT NULL,
  `buyer_uname` varchar(30) NOT NULL,
  `buyer_email` varchar(30) NOT NULL,
  `job_desc` varchar(255) NOT NULL,
  `job_date` date NOT NULL,
  `salary` int(30) NOT NULL,
  `freelancer_uname` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_list`
--

INSERT INTO `job_list` (`id`, `buyer_uname`, `buyer_email`, `job_desc`, `job_date`, `salary`, `freelancer_uname`) VALUES
(1, 'sumaiya', 'sumaiya@gmail.com', 'dotnet programmer needed with at least 1 year experience ', '2020-12-10', 50000, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`);

--
-- Indexes for table `freelancer`
--
ALTER TABLE `freelancer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `job_list`
--
ALTER TABLE `job_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `buyer`
--
ALTER TABLE `buyer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(10) NOT NULL AUTO_INCREMENT COMMENT '1', AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `freelancer`
--
ALTER TABLE `freelancer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job_list`
--
ALTER TABLE `job_list`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
