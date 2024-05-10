CREATE TABLE `roomlist` (
  `id` int NOT NULL,
  `RoomName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `RoomDate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `RoomTime` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `RoomCapacity` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `RoomPrice` decimal(8,2) NOT NULL,
  `discountedPrice` decimal(8,2) DEFAULT NULL,
  `RoomPromotion` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `RoomLaunched` tinyint(1) DEFAULT '0',
  `CurrentlyBooked` tinyint(1) DEFAULT '0'
);


INSERT INTO `roomlist` (`id`, `RoomName`, `RoomDate`, `RoomTime`, `RoomCapacity`, `RoomPrice`, `discountedPrice`, `RoomPromotion`, `RoomLaunched`, `CurrentlyBooked`) VALUES
(1, 'Biological Diversity', '15/04/2024', '12pm - 1pm', '1-5 pax', 5.00, 2.50, 'UOW5', 1, 0),
(2, 'Clean Air', '23/04/2024', '3am - 4pm', '1-2 pax', 5.00, 1.50, 'UOW10', 1, 1),
(3, 'Climate Action', '17/04/2024', '11am - 12pm', '1-2 pax', 5.00, 1.00, 'UOW50', 1, 0),
(4, 'Privacy Pod', '25/04/2024', '9am - 10am', '1-3 pax', 5.00, 1.00, 'UOW20', 1, 0);

ALTER TABLE `roomlist`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `roomlist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;



CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roles` varchar(100) NOT NULL
);

INSERT INTO `users` (`id`, `username`, `email`, `password`, `roles`) VALUES
(1, 'staff', 'staff@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'staff'),
(2, 'student', 'student@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'student');