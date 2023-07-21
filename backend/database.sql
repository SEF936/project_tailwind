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

DROP TABLE IF EXISTS `size`;
CREATE TABLE `size` (
  `id_size` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id_product` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(254) NOT NULL,
  `description` VARCHAR(254) NOT NULL,
  `category_id` INT NOT NULL,
  `image` VARCHAR(254) NOT NULL,
  `image2` VARCHAR(254) NULL,
  `image3` VARCHAR(254) NULL,
  `image4` VARCHAR(254) NULL,
  `color` VARCHAR(80) NULL,
  `size_id` INT NULL,
  `price` FLOAT NOT NULL,
  `promotionalPrice` FLOAT NULL,
  `adding_date` DATE NOT NULL,
  CONSTRAINT category_product FOREIGN KEY (`category_id`) REFERENCES `category`(`id_category`) ON DELETE CASCADE,
    CONSTRAINT size_product FOREIGN KEY (`size_id`) REFERENCES `size`(`id_size`) ON DELETE CASCADE
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

  INSERT INTO `size` (`title`)
VALUES ("S"),
  ("M"),("L"),("XL"),("XXL");

-- Create product
INSERT INTO `product` (
    `name`,
    `description`,
    `category_id`,
    `image`,
    `image2`,
    `image3`,
    `image4`,
    `color`,
    `size_id`,
    `price`,
    `promotionalPrice`,
    `adding_date`
  )
VALUES (
    'Robe à imprimé floral à nœud découpe',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    2,
    "robe1_1.webp",
    "robe1_2.webp",
    "robe1_3.webp",
    "robe1_4.webp",
    "blue",
    1,
    52.99,
    34.99,
    "2023-04-03"
  ),
  (
    'Robe portefeuille à volants fleuri',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
      "robe2_1.webp",
    "robe2_2.webp",
    "robe2_3.webp",
    "robe2_4.webp",
    "blue",
    4,
    84.99,
    64.99,
    "2023-05-03"
  ),
  (
    'Robe fendue à fines brides avec boutons',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    2,
   "robe3_1.webp",
    "robe3_2.webp",
    "robe3_3.webp",
    "robe3_4.webp",
    "blue",
    3,
    79.99,
    49.99,
    "2023-06-03"
  ),
  (
    'Robe avec tulle à col carré évasé',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
   "robe4_1.webp",
    "robe4_2.webp",
    "robe4_3.webp",
    "robe4_4.webp",
    "blue",
    1,
    99.99,
    79.99,
    "2023-01-03"
  ),
    (
    'Robe de bal ceinturée en mousseline avec manches papillon',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
   "robe5_1.webp",
    "robe5_2.webp",
    "robe5_3.webp",
    "robe5_4.webp",
    "blue",
    1,
    114.99,
    94.99,
    "2023-01-03"
  ),
      (
    'Robe manches dolman plissé',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
   "robe6_1.webp",
    "robe6_2.webp",
    "robe6_3.webp",
    "robe6_4.webp",
    "blue",
    1,
    149.99,
    119.99,
    "2023-01-03"
  ),    
  (
    'Robe trapèze fleuri ceinturé',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
   "robe7_1.webp",
    "robe7_2.webp",
    "robe7_3.webp",
    "robe7_4.webp",
    "blue",
    1,
    114.99,
    94.99,
    "2023-01-03"
  ),
    (
    'Robe à fines brides à imprimé tropical en dentelle',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
   "robe8_1.webp",
    "robe8_2.webp",
    "robe8_3.webp",
    "robe8_4.webp",
    "blue",
    1,
    114.99,
    94.99,
    "2023-01-03"
  ),
    (
    'Robe à manches chauve-souris fendu fleuri',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
   "robe9_1.webp",
    "robe9_2.webp",
    "robe9_3.webp",
    "robe9_4.webp",
    "blue",
    1,
    114.99,
    94.99,
    "2023-01-03"
  ),
      (
    'Robe à manches jolies fendu fleuri',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
   "robe10_1.webp",
    "robe10_2.webp",
    "robe10_3.webp",
    "robe10_4.webp",
    "blue",
    1,
    114.99,
    94.99,
    "2023-01-03"
  ),
      (
    'Robe moulante décolletée à paillettes à ruché métallique',
    'superbe robe quyi va voud jhsp^mfiofh oiehf oihenf oihe foçe  pçzeçà FP09je f àig',
    1,
   "robe11_1.webp",
    "robe11_2.webp",
    "robe11_3.webp",
    "robe11_4.webp",
    "blue",
    1,
    114.99,
    94.99,
    "2023-01-03"
  );