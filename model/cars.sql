-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-04-2021 a las 10:58:03
-- Versión del servidor: 8.0.22
-- Versión de PHP: 7.4.13RC1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `concesionario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `allcars`
--

CREATE TABLE `allcars` (
  `registration` varchar(7) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `regdate` date NOT NULL,
  `carcondition` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upgrades` varchar(200) NOT NULL,
  `category` varchar(120) NOT NULL,
  `price` int NOT NULL,
  `lat` varchar(45) NOT NULL,
  `lon` varchar(45) NOT NULL,
  `views` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `allcars`
--

INSERT INTO `allcars` (`registration`, `brand`, `model`, `regdate`, `carcondition`, `upgrades`, `category`, `price`, `lat`, `lon`, `views`) VALUES
('1345PDS', 'SEAT', 'Ibiza', '2018-10-30', 'Used', 'Motor:Wheels:', 'SEAT', 13500, '37.9923795', '-1.1305431', 41),
('4788GGD', 'Bugatti', 'Veyron', '2019-04-05', 'New', 'Motor:Wheels:Seats:', 'Premium', 2200000, '39.98333', '-0.03333', 44);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cars`
--

CREATE TABLE `cars` (
  `registration` varchar(7) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `regdate` date NOT NULL,
  `carcondition` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upgrades` varchar(200) NOT NULL,
  `category` varchar(120) NOT NULL,
  `price` int NOT NULL,
  `lat` varchar(45) NOT NULL,
  `lon` varchar(45) NOT NULL,
  `views` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cars`
--

INSERT INTO `cars` (`registration`, `brand`, `model`, `regdate`, `carcondition`, `upgrades`, `category`, `price`, `lat`, `lon`, `views`) VALUES
('0000AAA', 'KIA', 'Tiguan', '2018-10-10', 'Used', 'Wheels:', 'Beniganim,Nou', 9000, '-10.89000', '138.61816', 9),
('0000AAB', 'bmw', 'Serie 1', '2010-10-10', 'New', 'Motor:', 'Valencia', 9000, '76.98908', '21.74515', 5),
('0000AAF', 'KIA', 'Coupe', '2020-10-10', 'New', 'Motor:Wheels:Seats:', 'Promo', 19999, '38.942228', '-0.355878', 5),
('0000ASD', 'BMW', 'asd', '2021-02-09', 'New', 'Motor:', 'ASD', 8034, '41.3828939', '2.1774322', 5),
('0000AXC', 'Volvo', 'Corse', '2020-12-09', 'Old', 'Wheels:', 'Oferta', 2000, '40.416705', '3.703582', 4),
('1345PDS', 'SEAT', 'Ibiza', '2018-10-30', 'Used', 'Motor:Wheels:', 'SEAT', 13500, '37.9923795', '-1.1305431', 42),
('2484HSU', 'Mercedes-Benz', 'AMG1', '2019-09-20', 'Used', 'Motor:Wheels:', 'Garaje', 30450, '39.469707', '-0.376335', 2),
('2846HDS', 'Volkswagen', 'Polo', '2018-09-13', 'Used', 'Motor:', 'Nou,Barat', 4670, '38.353738', '-0.490185', 9),
('3649CGE', 'SEAT', 'Mondeo', '2021-02-28', 'Old', 'Motor:', 'SEAT', 4947, '', '', 36),
('7993HSF', 'FIAT', '500', '2020-03-07', 'New', 'Motor:Wheels:Seats:', 'Edicion Limitada', 3400, '', '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `cartuser` varchar(50) NOT NULL,
  `registration` varchar(10) NOT NULL,
  `insurance` tinyint(1) NOT NULL DEFAULT '0',
  `cartprice` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Disparadores `cart`
--
DELIMITER $$
CREATE TRIGGER `cart_au` BEFORE UPDATE ON `cart` FOR EACH ROW BEGIN
 	IF old.insurance <> new.insurance
    THEN
		IF new.insurance = 1
        THEN
			SET new.cartprice = (old.cartprice*1.10);
		ELSE
			SET new.cartprice = (old.cartprice/1.10);
        END IF;
    END IF;
 END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `daqwqwe` BEFORE INSERT ON `cart` FOR EACH ROW BEGIN
	SET new.cartprice=(SELECT price FROM cars
    WHERE registration = new.registration);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favs`
--

CREATE TABLE `favs` (
  `userfav` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registrationfav` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `favs`
--

INSERT INTO `favs` (`userfav`, `registrationfav`) VALUES
('username', '9834UZB'),
('username', '0000AAF'),
('username', '0000ASD'),
('username', '3649CGE'),
('username', '4788GGD'),
('avatar', '4788GGD'),
('avatar', '3649CGE'),
('avatar', '7993HSF'),
('avatar', '1345PDS'),
('avatar', '9834UZB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histcompr`
--

CREATE TABLE `histcompr` (
  `orderid` int NOT NULL,
  `usercompr` varchar(50) NOT NULL,
  `regcompr` varchar(10) NOT NULL,
  `price` int NOT NULL,
  `insurance` int DEFAULT NULL,
  `datecompr` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `histcompr`
--

INSERT INTO `histcompr` (`orderid`, `usercompr`, `regcompr`, `price`, `insurance`, `datecompr`) VALUES
(2, 'avatar', '0000ABB', 1000, NULL, '2021-04-04'),
(3, 'avatar', '4788GGD', 2200000, 0, '2021-04-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img`
--

CREATE TABLE `img` (
  `id` varchar(30) NOT NULL,
  `src` varchar(150) NOT NULL,
  `tipo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `img`
--

INSERT INTO `img` (`id`, `src`, `tipo`) VALUES
('0000AAA', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000AAB', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000AAC', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000AAF', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000ASD', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000AXC', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('1345PDS', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('1455LKD', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('1834JAF', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('1836NAO', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('2484HSU', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('2846HDS', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('3456GXW', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('3649CGE', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('4788GGD', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('7993HSF', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('9582JSI', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('9834UZB', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('BMW', 'https://cdn.pixabay.com/photo/2016/03/26/22/34/car-1281640_960_720.jpg', 'cat'),
('KM0', 'https://cdn.pixabay.com/photo/2015/12/08/00/28/car-1081742_960_720.jpg\r\n', 'cat'),
('Luxury', 'https://cdn.pixabay.com/photo/2020/09/06/07/37/car-5548242_960_720.jpg', 'cat'),
('Preowned', 'https://cdn.pixabay.com/photo/2017/08/22/00/27/car-dashboard-2667434_960_720.jpg', 'cat'),
('Seat', 'https://cdn.pixabay.com/photo/2017/08/12/12/00/seat-leon-2634185_960_720.jpg', 'cat');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `fullname` varchar(40) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `passwd` varchar(90) NOT NULL,
  `avatar` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`fullname`, `username`, `email`, `passwd`, `avatar`) VALUES
('', '', '', '$2y$10$zXS1vD7kjc7f.yyb0/qUOukuRoO51x23d.Wq/ejm2DoGO8eJjtNd6', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e'),
('tyutiyt', 'hryj', 'agsdf@gmail.c', '$2y$10$c8.qic9Vi/GQN5Tf/gJCf.XXx6DCUJfKFy9Z0/TFHSnSS/NA4lUBO', ''),
('asdsa', 'ASDASD', 'ASDASD@GMAIL.COM', '$2y$10$EQImzPzinq5GLZ5PJAzEReM0TKZZhwtEzcgeaiDJuyAxnR7KoPsNm', ''),
('ASDASDASD', 'asdasdasd', 'asdasdasd@gmail.com', '$2y$10$VAx/Hi57Qif2j1nWo2l5OeYomXwvtUFp8zSl5K4MNJcFsFM/lhoyS', 'https://www.gravatar.com/avatar/0c326eb8528814b9e1a5bc7bd60243a7'),
('asdsa', 'asdasdd', 'asdasdd@gmail.com', '$2y$10$tpVT2S8w57V8rlt8pTaSkOcvbOzVf3jtWtye8m1FpP2VrLz6scxS.', ''),
('avatar', 'avatar', 'avatar@gmail.com', '$2y$10$OC.kpSRHHXTKh.YMzgdwZOeWLq56csxf6nNmSa7gE5waEHxQekwQm', 'https://www.gravatar.com/avatar/07a002296bb5e158727d66cf3699ed34'),
('avatar', 'avatarr', 'avatarr@gmail.com', '$2y$10$6st.u1mSnC8rxxP9fMpvjejiqib6Qbk06KYxs27luPU9aCHgJyFFS', 'https://www.gravatar.com/avatar/8811f917041bf23899eadedb29eff383'),
('dsgd', 'sdggrtt', 'dfsdf@gmail.com', '$2y$10$HKSdDehqFCcI9gBxmKx23.5Vsx3cFSjh2PjGGR7etGH4k0ioNTozu', ''),
('Antoni Tormo', 'AntoniTG', 'gineraantoni@gmail.com', 'passwd', ''),
('asafadsgsd', 'pablo', 'pablo@gmail.com', '$2y$10$eBev69PHQz55dc/xRJfzuOC7/pDsUcbPIQStv/6ODDMPAKCSBThNq', 'https://www.gravatar.com/avatar/71182af69ae34c8d431aca417bdc5694'),
('asdasdsfd', 'asdasdfddg', 'sdasd@gmail.com', '$2y$10$ZYGEZMQQGMS4sqSVzoHgN.N0G8X9zXab5eKyCHjvUCnF6yib0xgfS', ''),
('asdsdgsdn', 'test', 'test@gmail.com', '$2y$10$j791Ib2NJgAt/9KI1HiU7uDim2dUTvYNvXy8X/.DL3NRqttl/E0YW', ''),
('dafsdgsgs', 'username', 'username@gmail.com', '$2y$10$JSYP6duOnxtN65gutpfuOO80CQiDt6IrjtpLBXaXSUCFH9WCZRx6q', 'https://www.gravatar.com/avatar/761cd16b141770ecb0bbb8a4e5962d16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`registration`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD UNIQUE KEY `registration` (`registration`);

--
-- Indices de la tabla `histcompr`
--
ALTER TABLE `histcompr`
  ADD UNIQUE KEY `regcompr` (`regcompr`);

--
-- Indices de la tabla `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
