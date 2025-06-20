-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 06:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fasttrack`
--

-- --------------------------------------------------------

--
-- Table structure for table `assign`
--

CREATE TABLE `assign` (
  `shipment_id` varchar(20) NOT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `origin_address` varchar(255) DEFAULT NULL,
  `destination_address` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `estimated_delivery_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assign`
--

INSERT INTO `assign` (`shipment_id`, `customer_name`, `origin_address`, `destination_address`, `status`, `estimated_delivery_date`) VALUES
('SHP001', 'John Doe', 'Colombo', 'Kandy', 'Assigned', '2025-06-21'),
('SHP002', 'Jane Smith', 'Galle', 'Jaffna', 'Assigned', '2025-06-22'),
('SHP003', 'A.R. Perera', 'Negombo', 'Batticaloa', 'Pending', '2025-06-23');

-- --------------------------------------------------------

--
-- Table structure for table `customer_notification`
--

CREATE TABLE `customer_notification` (
  `notification_id` int(11) NOT NULL,
  `personnel_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sent_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delivery_notifications`
--

CREATE TABLE `delivery_notifications` (
  `notification_id` int(11) NOT NULL,
  `personnel_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sent_date` date DEFAULT curdate(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_notifications`
--

INSERT INTO `delivery_notifications` (`notification_id`, `personnel_id`, `message`, `sent_date`, `created_at`) VALUES
(1, 101, 'Package dispatched successfully.', '2025-06-17', '2025-06-18 08:33:08'),
(2, 102, 'Your delivery has been delayed due to weather.', '2025-06-16', '2025-06-18 08:33:08'),
(3, 103, 'Please confirm your address for the upcoming shipment.', '2025-06-15', '2025-06-18 08:33:08'),
(4, 104, 'Package has been delivered. Thank you!', '2025-06-14', '2025-06-18 08:33:08'),
(5, 105, 'You have a new delivery scheduled for tomorrow.', '2025-06-13', '2025-06-18 08:33:08'),
(6, 110, 'failed', '2025-06-18', '2025-06-18 08:34:31');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_personnel`
--

CREATE TABLE `delivery_personnel` (
  `id` int(11) NOT NULL,
  `personnel_id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `schedule` varchar(100) DEFAULT NULL,
  `assigned_route` varchar(100) DEFAULT NULL,
  `delivery_history` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_personnel`
--

INSERT INTO `delivery_personnel` (`id`, `personnel_id`, `name`, `contact_number`, `schedule`, `assigned_route`, `delivery_history`) VALUES
(7, '1001', 'John Doe', '0123456789', 'Vase', 'Kandy', 'in-trasit'),
(9, '2', 'Jane Smith', '0772345678', 'Evening Shift', 'Route B', 'Delivered 15 packages'),
(10, '3', 'Ahmed Khan', '0773456789', 'Night Shift', 'Route C', 'Delivered 10 packages'),
(11, '4', 'Maria Garcia', '0774567890', 'Flexible', 'Route D', 'Delivered 25 packages'),
(12, '5', 'Liam Brown', '0775678901', 'Morning Shift', 'Route E', 'Delivered 30 packages');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `driver_id` varchar(10) NOT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `availability_status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`driver_id`, `driver_name`, `availability_status`) VALUES
('DRV001', 'Ruwan Silva', 'On Duty'),
('DRV002', 'Kamala Fernando', 'On Duty'),
('DRV003', 'Nuwan Perera', 'On Duty'),
('DRV004', 'Arun Perera', 'Available'),
('DRV005', 'Nimal Fernando', 'Available'),
('DRV006', 'Shanika Rodrigo', 'Available'),
('DRV007', 'Kasun Silva', 'Available'),
('DRV008', 'Dinesh Jayawardena', 'Available'),
('DRV009', 'Tharushi De Silva', 'Available'),
('DRV010', 'Ruwan Gunasekara', 'Available'),
('DRV011', 'Janith Wickramasinghe', 'Available'),
('DRV012', 'Chamali Herath', 'Available'),
('DRV013', 'Ashan Mendis', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `itemid` varchar(20) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `month` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`itemid`, `quantity`, `status`, `month`, `year`, `date`, `cost`, `price`, `value`) VALUES
('AC-9090', 12, 'In Stock', 'March', 2024, '2024-03-17', 399.99, 599.99, 7199.88),
('BAG-4444', 25, 'In Stock', 'August', 2024, '2024-08-07', 35.00, 59.99, 1499.75),
('BOK-5555', 40, 'In Stock', 'January', 2025, '2024-08-14', 12.50, 19.99, 799.60),
('CHR-2020', 14, 'In Stock', 'August', 2023, '2023-08-14', 65.50, 99.99, 1399.86),
('DRN-4040', 18, 'In Stock', 'January', 2024, '2024-01-08', 42.00, 79.99, 1439.82),
('DSK-1010', 7, 'In Stock', 'August', 2023, '2023-08-07', 125.00, 199.99, 1399.93),
('FAN-7070', 30, 'In Stock', 'March', 2024, '2024-03-03', 29.99, 49.99, 1499.70),
('FRG-4004', 5, 'In Stock', 'March', 2023, '2023-03-05', 450.00, 699.99, 3499.95),
('HTR-8080', 4, 'Low Stock', 'March', 2024, '2024-03-10', 55.00, 89.99, 359.96),
('IT001', 10, 'sold', 'January', 2025, '2025-01-15', 100.00, 150.00, 1500.00),
('IT002', 5, 'available', 'January', 2025, '2025-01-18', 80.00, 130.00, 650.00),
('IT003', 12, 'sold', 'February', 2025, '2025-02-10', 60.00, 100.00, 1200.00),
('IT004', 8, 'returned', 'February', 2025, '2025-02-14', 50.00, 90.00, 720.00),
('IT005', 15, 'available', 'March', 2025, '2025-03-05', 40.00, 70.00, 1050.00),
('IT006', 9, 'sold', 'March', 2025, '2025-03-20', 55.00, 95.00, 855.00),
('IT007', 6, 'sold', 'April', 2025, '2025-04-12', 90.00, 140.00, 840.00),
('IT008', 20, 'available', 'April', 2025, '2025-04-25', 60.00, 120.00, 1200.00),
('IT009', 7, 'returned', 'May', 2025, '2025-05-09', 110.00, 110.00, 770.00),
('IT010', 13, 'sold', 'May', 2025, '2025-05-22', 45.00, 85.00, 1105.00);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `Shipment_ID` varchar(10) NOT NULL,
  `DeliveryStatus` varchar(20) DEFAULT NULL,
  `DateDelivery` date DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `CustomerReview` text DEFAULT NULL,
  `AdminReply` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`Shipment_ID`, `DeliveryStatus`, `DateDelivery`, `Rating`, `CustomerReview`, `AdminReply`) VALUES
('SH001', 'Delivered', '2025-06-01', 5, 'Fast and reliable!', 'Thank you!'),
('SH002', 'On-Delivery', '2025-06-12', 4, 'Waiting on delivery', 'Will be there soon'),
('SH003', 'Failed', '2025-06-08', 1, 'Never received package', 'We apologize'),
('SH004', 'Delivered', '2025-06-03', 5, 'Awesome service!', 'Glad to hear that!'),
('SH005', 'On-Delivery', '2025-06-13', 3, 'Package is late', 'We are checking it'),
('SH006', 'Delivered', '2025-06-02', 4, 'Good packaging', 'Thank you!'),
('SH007', 'Returned', '2025-06-10', 2, 'Wrong item sent', 'We will investigate'),
('SH008', 'Failed', '2025-06-07', 1, 'No delivery attempt made', 'Sorry for the inconvenience'),
('SH009', 'Delivered', '2025-06-05', 5, 'Super fast delivery!', 'We appreciate your feedback'),
('SH010', 'On-Delivery', '2025-06-12', 3, 'Tracking not updated', 'We will update it soon'),
('SH011', 'Delivered', '2025-06-04', 4, 'Delivered as promised', 'Thank you!'),
('SH012', 'Returned', '2025-06-09', 2, 'Item damaged', 'We will send a replacement'),
('SH013', 'Failed', '2025-06-06', 1, 'Package lost', 'Very sorry, we are resolving it'),
('SH014', 'On-Delivery', '2025-06-11', 3, 'Still waiting', 'Should arrive today'),
('SH015', 'Delivered', '2025-06-03', 5, 'Perfect experience', 'Thanks for trusting us'),
('SH016', 'On-Delivery', '2025-06-13', 4, 'Hope it arrives today', 'On the way!'),
('SH017', 'Delivered', '2025-06-01', 5, 'Love your service', 'Appreciate that!'),
('SH018', 'Returned', '2025-06-10', 2, 'Did not like the item', 'You can request a return'),
('SH019', 'Failed', '2025-06-08', 1, 'Never showed up', 'We are investigating'),
('SH020', 'Delivered', '2025-06-05', 4, 'Well done!', 'Much appreciated!'),
('SH021', 'On-Delivery', '2025-06-12', 3, 'Delivery late', 'We’ll speed it up'),
('SH022', 'Delivered', '2025-06-04', 5, 'Very happy', 'Thank you for your feedback'),
('SH023', 'Returned', '2025-06-09', 2, 'Didn’t fit', 'You can exchange it'),
('SH024', 'Failed', '2025-06-07', 1, 'Courier never came', 'Our apologies'),
('SH025', 'Delivered', '2025-06-02', 5, 'Excellent timing', 'Glad you liked it'),
('SH026', 'On-Delivery', '2025-06-11', 4, 'So far so good', 'Thank you!'),
('SH027', 'Delivered', '2025-06-06', 5, 'Perfectly packed', 'Appreciate the kind words'),
('SH028', 'Returned', '2025-06-10', 2, 'Unwanted product', 'Return process initiated'),
('SH029', 'Failed', '2025-06-08', 1, 'Wasn’t delivered at all', 'We are sorry'),
('SH030', 'Delivered', '2025-06-05', 4, 'Nice one', 'Thank you very much!'),
('SH031', 'On-Delivery', '2025-06-12', 3, 'Hope it arrives soon', 'Almost there!');

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

CREATE TABLE `shipment` (
  `id` int(11) NOT NULL,
  `sender` varchar(100) NOT NULL,
  `receiver` varchar(100) NOT NULL,
  `package_details` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipment`
--

INSERT INTO `shipment` (`id`, `sender`, `receiver`, `package_details`, `status`) VALUES
(1, 'John Doe', 'Alice Smith', 'Electronics - Laptop', 'Dispatched'),
(2, 'dgrfgdrrhgrd', 'Robert Brown', 'Books - 3 volumes', 'Delivered'),
(4, 'tdhdry', 'Sara Khan', 'Mobile accessories - charger and case', 'Pending'),
(5, 'Sophia Lopez', 'Noah Davis', 'Home decor - vase and frame', 'Delivered'),
(8, 'John Hans', 'Marty Sheriff', 'Glassware - 3 packs', 'In-transit');

-- --------------------------------------------------------

--
-- Table structure for table `shipment_assignments`
--

CREATE TABLE `shipment_assignments` (
  `id` int(11) NOT NULL,
  `shipment_id` varchar(20) DEFAULT NULL,
  `driver_id` varchar(10) DEFAULT NULL,
  `assignment_status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipment_assignments`
--

INSERT INTO `shipment_assignments` (`id`, `shipment_id`, `driver_id`, `assignment_status`) VALUES
(1, 'SHP001', 'DRV001', 'Active'),
(2, 'SHP002', 'DRV002', 'Active'),
(3, 'SHP001', 'DRV002', 'Active'),
(4, 'SHP002', 'DRV001', 'Active'),
(5, 'SHP002', 'DRV003', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tracking`
--

CREATE TABLE `tracking` (
  `id` int(11) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `estimated_delivery_time` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `delays` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tracking`
--

INSERT INTO `tracking` (`id`, `product_id`, `location`, `estimated_delivery_time`, `status`, `delays`) VALUES
(1, 'P001', 'Colombo', '2025-06-20 14:00:00', 'In Transit', ''),
(2, 'P002', 'Kandy', '2025-06-21 10:30:00', 'Delayed', 'Heavy rain'),
(3, 'P003', 'Galle', '2025-06-19 16:00:00', 'Delivered', ''),
(4, 'P004', 'Jaffna', '2025-06-22 11:00:00', 'In Transit', ''),
(5, 'P005', 'Balagolla, kandy', '2025-06-24 00:00:00', 'In Transit', 'Sunny'),
(11, 'P006', 'Kandy', '2025-06-07 00:00:00', 'Pending', 'Rain'),
(12, 'jgja', 'Kandy', '2025-06-07 00:00:00', 'Pending', 'Rain');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assign`
--
ALTER TABLE `assign`
  ADD PRIMARY KEY (`shipment_id`);

--
-- Indexes for table `customer_notification`
--
ALTER TABLE `customer_notification`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `delivery_notifications`
--
ALTER TABLE `delivery_notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `delivery_personnel`
--
ALTER TABLE `delivery_personnel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driver_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`itemid`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`Shipment_ID`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipment_assignments`
--
ALTER TABLE `shipment_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipment_id` (`shipment_id`),
  ADD KEY `driver_id` (`driver_id`);

--
-- Indexes for table `tracking`
--
ALTER TABLE `tracking`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_notification`
--
ALTER TABLE `customer_notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery_notifications`
--
ALTER TABLE `delivery_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `delivery_personnel`
--
ALTER TABLE `delivery_personnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `shipment`
--
ALTER TABLE `shipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `shipment_assignments`
--
ALTER TABLE `shipment_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tracking`
--
ALTER TABLE `tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `shipment_assignments`
--
ALTER TABLE `shipment_assignments`
  ADD CONSTRAINT `shipment_assignments_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `assign` (`shipment_id`),
  ADD CONSTRAINT `shipment_assignments_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`driver_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
