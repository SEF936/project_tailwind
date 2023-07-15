-- Active: 1682342265558@@127.0.0.1@3306@project_store

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id_role` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(254) NOT NULL,
  `creation_date` DATE NOT NULL,
  `role_id` INT NOT NULL,
  CONSTRAINT role_user FOREIGN KEY (`role_id`) REFERENCES `role`(`id_role`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id_category` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id_product` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(254) NOT NULL,
  `description` VARCHAR(254) NOT NULL,
  `category_id` INT NOT NULL,
  `image` VARCHAR(254) NOT NULL,
  `color` VARCHAR(80) NULL,
  `size` VARCHAR(80) NULL,
  `price` FLOAT NOT NULL,
  `promotionalPrice` FLOAT NULL,
  `adding_date` DATE NOT NULL,
  CONSTRAINT category_product FOREIGN KEY (`category_id`) REFERENCES `category`(`id_category`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- ___________________________________ POPULATE TABLES ___________________________________ 
INSERT INTO `role` (`title`)
VALUES ("admin"),
  ("client");

-- Create user
INSERT INTO `user` (
    `firstname`,
    `lastname`,
    `email`,
    `password`,
    `role_id`,
    `creation_date`
  )
VALUES (
    'Nicolas',
    'Lopes',
    'admin@gmail.com',
    '$argon2id$v=19$m=19893.36898592844,t=2,p=1$mkm5zcvh7mTtDGu0UsOZxw$bcLPeyJqaJGN4mX2aILxsnbeCszJrBJUJDjEXewSrE8',
    1,
    "2023-03-03"
  ),
  (
    'sarah',
    'Lopes',
    'user@gmail.com',
    '$argon2id$v=19$m=19893.36898592844,t=2,p=1$+RUYi4CW31MZnxxRBO9Alw$u0TJVC8gPPUeb/bj/1sjeexnbnIBYP7aLk2ydKm2odU',
    2,
    "2023-03-03"
  );
-- ('admin@gmail.com', 'admin', 1),
-- ('user@gmail.com', 'user', 0);
-- Create category
INSERT INTO `category` (`title`)
VALUES ("jupes"),
  ("robes longues");
-- Create product
INSERT INTO `product` (
    `name`,
    `description`,
    `category_id`,
    `image`,
    `color`,
    `size`,
    `price`,
    `promotionalPrice`,
    `adding_date`
  )
VALUES (
    'Robe à imprimé floral à nœud découpe',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    2,
    "robe1_1.webp",
    "blue",
    "L",
    34.99,
    22.99,
    "2023-04-03"
  ),
  (
    'Jupe à imprimé floral à nœud découpe',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
    "robe2_1.webp",
    "blue",
    "XL",
    64.99,
    44.99,
    "2023-05-03"
  ),
  (
    'Robe à imprimé floral à nœud découpe',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    2,
    "robe3_1.webp",
    "blue",
    "L",
    54.99,
    32.99,
    "2023-06-03"
  ),
  (
    'Jupe à imprimé floral à nœud découpe',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
    "robe4_1.webp",
    "blue",
    "S",
    84.99,
    42.99,
    "2023-01-03"
  );