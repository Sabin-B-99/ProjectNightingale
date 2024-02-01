-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: projnight_users
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `projnight_users`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `projnight_users` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `projnight_users`;

--
-- Table structure for table `authentication_methods`
--

DROP TABLE IF EXISTS `authentication_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authentication_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authentication_method` varchar(45) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authentication_methods`
--

LOCK TABLES `authentication_methods` WRITE;
/*!40000 ALTER TABLE `authentication_methods` DISABLE KEYS */;
INSERT INTO `authentication_methods` VALUES (1,'client_secret_basic','3dce3d79-4ac3-4c06-8bed-5b3c5f46324e');
/*!40000 ALTER TABLE `authentication_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authorities`
--

DROP TABLE IF EXISTS `authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authority` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorities`
--

LOCK TABLES `authorities` WRITE;
/*!40000 ALTER TABLE `authorities` DISABLE KEYS */;
INSERT INTO `authorities` VALUES (1,'read'),(2,'write'),(3,'read'),(4,'read'),(5,'read');
/*!40000 ALTER TABLE `authorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_token_settings`
--

DROP TABLE IF EXISTS `client_token_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_token_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `access_token_ttl` int NOT NULL,
  `refresh_token_ttl` int NOT NULL,
  `token_type` varchar(45) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `client_token_settings_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_token_settings`
--

LOCK TABLES `client_token_settings` WRITE;
/*!40000 ALTER TABLE `client_token_settings` DISABLE KEYS */;
INSERT INTO `client_token_settings` VALUES (1,20,10,'self-contained','3dce3d79-4ac3-4c06-8bed-5b3c5f46324e');
/*!40000 ALTER TABLE `client_token_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` varchar(255) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  `client_secret` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES ('3dce3d79-4ac3-4c06-8bed-5b3c5f46324e','ProjectNightingaleWebApp','$2a$10$5rmvMAdmBFmVYh31L06R3uz0Hl.S7Y1mlH7aHSIwl4/MXXxMvFFBC');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grant_types`
--

DROP TABLE IF EXISTS `grant_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grant_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grant_type` varchar(45) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `grant_types_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grant_types`
--

LOCK TABLES `grant_types` WRITE;
/*!40000 ALTER TABLE `grant_types` DISABLE KEYS */;
INSERT INTO `grant_types` VALUES (1,'authorization_code','3dce3d79-4ac3-4c06-8bed-5b3c5f46324e'),(2,'refresh_token','3dce3d79-4ac3-4c06-8bed-5b3c5f46324e');
/*!40000 ALTER TABLE `grant_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redirect_urls`
--

DROP TABLE IF EXISTS `redirect_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `redirect_urls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `redirect_urls_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redirect_urls`
--

LOCK TABLES `redirect_urls` WRITE;
/*!40000 ALTER TABLE `redirect_urls` DISABLE KEYS */;
INSERT INTO `redirect_urls` VALUES (1,'http://127.0.0.1:4200/authorized','3dce3d79-4ac3-4c06-8bed-5b3c5f46324e');
/*!40000 ALTER TABLE `redirect_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_tokens`
--

DROP TABLE IF EXISTS `registration_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `expiry_time` datetime NOT NULL,
  `confirmation_time` datetime DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_tokens`
--

LOCK TABLES `registration_tokens` WRITE;
/*!40000 ALTER TABLE `registration_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scopes`
--

DROP TABLE IF EXISTS `scopes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scopes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scope` varchar(45) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `scopes_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scopes`
--

LOCK TABLES `scopes` WRITE;
/*!40000 ALTER TABLE `scopes` DISABLE KEYS */;
INSERT INTO `scopes` VALUES (1,'openid','3dce3d79-4ac3-4c06-8bed-5b3c5f46324e');
/*!40000 ALTER TABLE `scopes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account_details`
--

DROP TABLE IF EXISTS `user_account_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_account_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_account_non_expired` tinyint NOT NULL,
  `is_account_non_locked` tinyint NOT NULL,
  `is_credentials_non_expired` tinyint NOT NULL,
  `is_account_enabled` tinyint NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account_details`
--

LOCK TABLES `user_account_details` WRITE;
/*!40000 ALTER TABLE `user_account_details` DISABLE KEYS */;
INSERT INTO `user_account_details` VALUES (7,1,1,1,1,'99d30f94-540a-4a0b-95a4-c22438ed5e9e'),(8,1,1,1,1,'1b301b5d-0b7f-46d2-bbb5-0cb72778531d'),(9,1,1,1,1,'36225fdb-6a1b-4a68-9506-788dbdf3e99b'),(10,1,1,1,1,'fb1a2db9-a40b-40c0-9602-57d2dabffd4b'),(11,1,1,1,1,'125d1bdf-3396-4a68-9dec-84dc36de191e'),(12,1,1,1,1,'364057ce-a10b-44c5-a4c8-8e3e269261ef'),(13,1,1,1,1,'95c24900-bf2b-45f2-b607-e524d2c2e624');
/*!40000 ALTER TABLE `user_account_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authorities`
--

DROP TABLE IF EXISTS `user_authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authorities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `authority_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authorities`
--

LOCK TABLES `user_authorities` WRITE;
/*!40000 ALTER TABLE `user_authorities` DISABLE KEYS */;
INSERT INTO `user_authorities` VALUES (1,'125d1bdf-3396-4a68-9dec-84dc36de191e',3),(2,'364057ce-a10b-44c5-a4c8-8e3e269261ef',4),(3,'95c24900-bf2b-45f2-b607-e524d2c2e624',5);
/*!40000 ALTER TABLE `user_authorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (6,'badal.sabin@test.com','Sabin','Badal','99d30f94-540a-4a0b-95a4-c22438ed5e9e'),(7,'rabin.badal@test.com','Rabin','Badal','1b301b5d-0b7f-46d2-bbb5-0cb72778531d'),(8,'nabin.badal@xyz.com','Nabin','Badal','36225fdb-6a1b-4a68-9506-788dbdf3e99b'),(9,'k.badal@abc.com','Kabin','Badal','fb1a2db9-a40b-40c0-9602-57d2dabffd4b'),(10,'bab.al@abc.com','Babin','Badal','125d1bdf-3396-4a68-9dec-84dc36de191e'),(11,'abhinabbadal11@gmail.com','abhinab ','badal ','364057ce-a10b-44c5-a4c8-8e3e269261ef'),(12,'ghi@abc.com','abc','def','95c24900-bf2b-45f2-b607-e524d2c2e624');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('125d1bdf-3396-4a68-9dec-84dc36de191e','bobbin','$2a$10$5IfQm38XFBHWvAtbIZ.MGOK6JPwIxfLYuXRFRmCSeP3A7icsbPJjC'),('1b301b5d-0b7f-46d2-bbb5-0cb72778531d','rabinB','$2a$10$6QlUH1MHV4PkCZ9YuWiQSuPWdueM4A4R41a4xZ4RMgEs2IBt/pRxm'),('36225fdb-6a1b-4a68-9506-788dbdf3e99b','nbadal','$2a$10$JIl1uAMWOl5lPHfIWIRrTeEGSvGy6iEOY08Cun3zFx6x/j/QW3/8K'),('364057ce-a10b-44c5-a4c8-8e3e269261ef','niiii','$2a$10$r.difs71pr2fa7mNx3cYnuU3m3VMfWBpnbht8qooqhOe7OwVlvhtS'),('95c24900-bf2b-45f2-b607-e524d2c2e624','abc','$2a$10$.KXIzwjh3TFb0ndDN8dIBO0OVSr0MzdTvxxYs9GtMS5H1AnxvOB3i'),('99d30f94-540a-4a0b-95a4-c22438ed5e9e','sabin_b_99','$2a$10$DDAXukAueZNVia79BkwsAOd7TgSueb58qgYCvNN1Tq2JdQ5k3KbGG'),('fb1a2db9-a40b-40c0-9602-57d2dabffd4b','kbad','$2a$10$uwNASllFoga9xrJJdadqbunIZ75CRJd5VkD/3iGFBSXQPS5wCFZTu');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `projnight_practice`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `projnight_practice` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `projnight_practice`;

--
-- Table structure for table `chord_changes`
--

DROP TABLE IF EXISTS `chord_changes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chord_changes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `change_from_root_order` int NOT NULL,
  `change_from_key_id` int NOT NULL,
  `change_to_root_order` int NOT NULL,
  `change_to_key_id` int NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `change_from_root_order` (`change_from_root_order`,`change_from_key_id`),
  KEY `change_to_root_order` (`change_to_root_order`,`change_to_key_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `chord_changes_ibfk_1` FOREIGN KEY (`change_from_root_order`, `change_from_key_id`) REFERENCES `chords` (`chord_root_order`, `chord_key_id`),
  CONSTRAINT `chord_changes_ibfk_2` FOREIGN KEY (`change_to_root_order`, `change_to_key_id`) REFERENCES `chords` (`chord_root_order`, `chord_key_id`),
  CONSTRAINT `chord_changes_ibfk_3` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chord_changes`
--

LOCK TABLES `chord_changes` WRITE;
/*!40000 ALTER TABLE `chord_changes` DISABLE KEYS */;
INSERT INTO `chord_changes` VALUES (111,4,1,5,1,191),(112,0,1,2,1,191),(113,4,1,0,1,192),(115,5,1,4,1,196),(116,5,1,7,1,196),(117,0,1,2,1,201),(118,4,1,5,1,201);
/*!40000 ALTER TABLE `chord_changes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chords`
--

DROP TABLE IF EXISTS `chords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chords` (
  `chord_root_order` int NOT NULL,
  `chord_key_id` int NOT NULL,
  `image_file_name` varchar(256) NOT NULL,
  `chord_root_name` varchar(8) NOT NULL,
  `chord_key_name` varchar(8) NOT NULL,
  PRIMARY KEY (`chord_root_order`,`chord_key_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chords`
--

LOCK TABLES `chords` WRITE;
/*!40000 ALTER TABLE `chords` DISABLE KEYS */;
INSERT INTO `chords` VALUES (0,1,'C','C','maj'),(0,11,'Cm','C','min'),(2,1,'D','D','maj'),(2,11,'Dm','D','min'),(4,1,'E','E','maj'),(4,11,'Em','E','min'),(5,1,'F','F','maj'),(5,11,'Fm','F','min'),(7,1,'G','G','maj'),(7,11,'Gm','G','min'),(9,1,'A','A','maj'),(9,11,'Am','A','min'),(11,1,'B','B','maj'),(11,11,'Bm','B','min');
/*!40000 ALTER TABLE `chords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metronomes`
--

DROP TABLE IF EXISTS `metronomes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metronomes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bpm` int NOT NULL,
  `beats_per_measure` int NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `metronomes_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metronomes`
--

LOCK TABLES `metronomes` WRITE;
/*!40000 ALTER TABLE `metronomes` DISABLE KEYS */;
INSERT INTO `metronomes` VALUES (104,128,4,186),(105,100,4,187),(109,121,6,191),(110,100,4,193),(111,109,4,192),(114,107,4,196),(119,134,6,201),(120,100,4,202);
/*!40000 ALTER TABLE `metronomes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routines`
--

DROP TABLE IF EXISTS `routines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `duration` mediumint NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routines`
--

LOCK TABLES `routines` WRITE;
/*!40000 ALTER TABLE `routines` DISABLE KEYS */;
INSERT INTO `routines` VALUES (139,'Routine sabinn 1',540,'99d30f94-540a-4a0b-95a4-c22438ed5e9e'),(140,'Routine bobbin 2',180,'125d1bdf-3396-4a68-9dec-84dc36de191e'),(142,'Routine bobbin 1',180,'125d1bdf-3396-4a68-9dec-84dc36de191e'),(145,'Routine sabinn 2',240,'99d30f94-540a-4a0b-95a4-c22438ed5e9e'),(149,'Strum',360,'95c24900-bf2b-45f2-b607-e524d2c2e624');
/*!40000 ALTER TABLE `routines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strum_patterns`
--

DROP TABLE IF EXISTS `strum_patterns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `strum_patterns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pattern` varchar(64) NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `strum_patterns_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strum_patterns`
--

LOCK TABLES `strum_patterns` WRITE;
/*!40000 ALTER TABLE `strum_patterns` DISABLE KEYS */;
INSERT INTO `strum_patterns` VALUES (113,'DUDU',191),(114,'DUD',191),(115,'XDX',192),(116,'X',192),(117,'XD',192),(118,'DUXDDU',201);
/*!40000 ALTER TABLE `strum_patterns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_chords`
--

DROP TABLE IF EXISTS `topic_chords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_chords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic_id` int NOT NULL,
  `chord_root_order` int NOT NULL,
  `chord_key_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `topic_id` (`topic_id`),
  KEY `chord_root_order` (`chord_root_order`,`chord_key_id`),
  CONSTRAINT `topic_chords_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `topic_chords_ibfk_2` FOREIGN KEY (`chord_root_order`, `chord_key_id`) REFERENCES `chords` (`chord_root_order`, `chord_key_id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_chords`
--

LOCK TABLES `topic_chords` WRITE;
/*!40000 ALTER TABLE `topic_chords` DISABLE KEYS */;
INSERT INTO `topic_chords` VALUES (175,186,2,1),(176,187,7,1),(180,191,0,1),(181,191,2,1),(182,193,0,1),(183,193,5,1),(184,193,2,1),(187,192,2,1),(188,192,4,1),(195,196,7,1),(196,196,5,1),(197,196,0,1),(203,201,4,1),(204,201,0,1),(205,201,2,1),(206,202,0,1),(207,202,4,1),(208,202,2,1),(209,202,5,1);
/*!40000 ALTER TABLE `topic_chords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `song_title` varchar(256) DEFAULT NULL,
  `time_duration` mediumint NOT NULL,
  `routine_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `routine_id` (`routine_id`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (186,'Tes Topic 1','Song 1',180,140),(187,'Topic 1','Song 1',180,142),(191,'Topic 1','Song 1',180,139),(192,'Topic 2','Song 2',180,139),(193,'Topic 3','Song 3',180,139),(196,'Topic 2','Song 2',240,145),(201,'ABC','',180,149),(202,'Topic 2','song 2',180,149);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `projnight_songs`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `projnight_songs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `projnight_songs`;

--
-- Table structure for table `chord_keys`
--

DROP TABLE IF EXISTS `chord_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chord_keys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key_name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chord_keys`
--

LOCK TABLES `chord_keys` WRITE;
/*!40000 ALTER TABLE `chord_keys` DISABLE KEYS */;
INSERT INTO `chord_keys` VALUES (1,'maj'),(2,'5'),(3,'6'),(4,'7'),(5,'maj7'),(6,'9'),(7,'maj9'),(8,'11'),(9,'13'),(10,'maj13'),(11,'min'),(12,'m6'),(13,'m7'),(14,'m9'),(15,'m11'),(16,'m13'),(17,'m(maj7)'),(18,'sus2'),(19,'sus4'),(20,'dim'),(21,'aug'),(22,'6/9'),(23,'7sus4'),(24,'7b5'),(25,'7b9'),(26,'9sus4'),(27,'add9'),(28,'aug9');
/*!40000 ALTER TABLE `chord_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chord_roots`
--

DROP TABLE IF EXISTS `chord_roots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chord_roots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `root_order` int NOT NULL,
  `root_name` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chord_roots`
--

LOCK TABLES `chord_roots` WRITE;
/*!40000 ALTER TABLE `chord_roots` DISABLE KEYS */;
INSERT INTO `chord_roots` VALUES (1,0,'C'),(2,1,'C#'),(3,1,'Db'),(4,2,'D'),(5,3,'D#'),(6,3,'Eb'),(7,4,'E'),(8,5,'F'),(9,6,'F#'),(10,6,'Gb'),(11,7,'G'),(12,8,'G#'),(13,8,'Ab'),(14,9,'A'),(18,10,'A#'),(19,10,'Bb'),(20,11,'B');
/*!40000 ALTER TABLE `chord_roots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chords`
--

DROP TABLE IF EXISTS `chords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chords` (
  `chord_root_order` int NOT NULL,
  `chord_key_id` int NOT NULL,
  `image_file_name` varchar(256) NOT NULL,
  `chord_root_name` varchar(8) NOT NULL,
  `chord_key_name` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chords`
--

LOCK TABLES `chords` WRITE;
/*!40000 ALTER TABLE `chords` DISABLE KEYS */;
INSERT INTO `chords` VALUES (0,1,'C','C','maj'),(0,11,'Cm','C','min'),(2,1,'D','D','maj'),(2,11,'Dm','D','min'),(4,1,'E','E','maj'),(4,11,'Em','E','min'),(5,1,'F','F','maj'),(5,11,'Fm','F','min'),(7,1,'G','G','maj'),(7,11,'Gm','G','min'),(9,1,'A','A','maj'),(9,11,'Am','A','min'),(11,1,'B','B','maj'),(11,11,'Bm','B','min');
/*!40000 ALTER TABLE `chords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guitar_capo_positions`
--

DROP TABLE IF EXISTS `guitar_capo_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guitar_capo_positions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `capo_position` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guitar_capo_positions`
--

LOCK TABLES `guitar_capo_positions` WRITE;
/*!40000 ALTER TABLE `guitar_capo_positions` DISABLE KEYS */;
INSERT INTO `guitar_capo_positions` VALUES (1,'No Capo'),(2,'1st fret'),(3,'2nd fret'),(4,'3rd fret'),(5,'4th fret'),(6,'5th fret'),(7,'6th fret'),(8,'7th fret'),(9,'8th fret'),(10,'9th fret'),(11,'10th fret'),(12,'11th fret'),(13,'12th fret');
/*!40000 ALTER TABLE `guitar_capo_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guitar_tab_lyrics`
--

DROP TABLE IF EXISTS `guitar_tab_lyrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guitar_tab_lyrics` (
  `id` varchar(255) NOT NULL,
  `lyrics` varchar(4096) NOT NULL,
  `song_tab_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `song_tab_id` (`song_tab_id`),
  CONSTRAINT `guitar_tab_lyrics_ibfk_1` FOREIGN KEY (`song_tab_id`) REFERENCES `song_tabs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guitar_tab_lyrics`
--

LOCK TABLES `guitar_tab_lyrics` WRITE;
/*!40000 ALTER TABLE `guitar_tab_lyrics` DISABLE KEYS */;
INSERT INTO `guitar_tab_lyrics` VALUES ('7843f6af-e84e-4289-b356-9afb02b81364','[Gmaj]\nThere I was again tonight \n[Dmaj]\nForcing laughter, faking smiles \n[Emin]                       G\nSame old tired, lonely place \nG\nWalls of insincerity\nD\nShifting eyes and vacancy \nEm			  G		\nVanished when I saw your face \n\n\n                           C                G        D\nAll I can say, is that it was enchanting to meet you\n\nG                                \nYou\'re eyes whispered \'have we met?\' \nD\nCrossed the room, your sillohuette \nEm                        G\nStarts to make its way to me \n\nG\nThe playful conversation starts \nD\nCounter all your quick remarks \nEm                    G\nLike passing notes in secrecy \n \n       C                  G        D\nAnd it was enchanting to meet you \n               C                      G       D\nAll I can say was I was enchanted to meet you \n\n\nchorus:\n\nC          Em   G   \nThis night is sparkling \nD                C\nDon\'t you let it go \n              G\nI\'m wonderstruck\n          D \nBlushing all the way home\nC              G     D               Em\nI\'ll spend forever wondering if you knew \n        C           G       D    \nI was enchanted to meet you \n\nG\nThe lingering question kept me up \nD\n2 AM, who do you love? \nEm                       G\nI wonder till I\'m wide awake \nG\nI know I\'m pacing back and forth\nD \nWishing you were at my door \nEm                         G\nI\'d open up and you would say \'hey\' \n    \n\n      C                  G        D\nAnd it was enchanting to meet you \n                      C               G       D\nAll I know is that I was enchanted to meet you \n\n\nchorus:\n\nC          Em   G   \nThis night is sparkling \nD                C\nDon\'t you let it go \n              G\nI\'m wonderstruck\n          D \nBlushing all the way home\nC              G     D               Em\nI\'ll spend forever wondering if you knew \nC  G  D    \n\n\nC           Em    G\nThis night is flawless \nD                C\nDon\'t you let it go\n           G \nI\'m wonderstruck \n                D\nDancing around all alone \nC              G    D                Em\nI\'ll spend forever wondering if you knew\n        C           G    D    \nI was enchanted to meet you \n\nG D Em C x2 \n\nG            D\nThis is me praying now\nEm                       C\nthis was the very first page \n\nNot where the storyline ends \nEm\nMy thoughts will echo your name \nC                 Em\nUntil I see you again \n                            C                         D\nThese are the words I held back as I was leaving too soon \n                    G      D\nI was enchanted to meet you \nG                             D \nPlease, don\'t be in love with someone else \nEm                           G\nPlease, don\'t have somebody waiting on you \n                                D \nPlease, don\'t be in love with someone else \nEm                            G\nPlease, don\'t have somebody waiting on you \n\n\n\nC          Em   G   \nThis night is sparkling \nD                C\nDon\'t you let it go \n              G\nI\'m wonderstruck\n          D \nBlushing all the way home\nC              G     D               Em\nI\'ll spend forever wondering if you knew \nC  G  D    \n \nC           Em    G\nThis night is flawless \nD                C\nDon\'t you let it go\n           G \nI\'m wonderstruck \n                D\nDancing around all alone \nC              G    D                Em\nI\'ll spend forever wondering if you knew\n        C           G    D   G   \nI was enchanted to meet you ','3dce3d79-4ac3-4c06-8bed-5b3c5f46324e');
/*!40000 ALTER TABLE `guitar_tab_lyrics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guitar_tab_other_req_details`
--

DROP TABLE IF EXISTS `guitar_tab_other_req_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guitar_tab_other_req_details` (
  `id` varchar(255) NOT NULL,
  `tuning_type` varchar(31) NOT NULL,
  `capo_position` varchar(15) NOT NULL,
  `difficulty` varchar(15) NOT NULL,
  `song_tab_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `song_tab_id` (`song_tab_id`),
  CONSTRAINT `guitar_tab_other_req_details_ibfk_1` FOREIGN KEY (`song_tab_id`) REFERENCES `song_tabs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guitar_tab_other_req_details`
--

LOCK TABLES `guitar_tab_other_req_details` WRITE;
/*!40000 ALTER TABLE `guitar_tab_other_req_details` DISABLE KEYS */;
INSERT INTO `guitar_tab_other_req_details` VALUES ('1831db73-fba5-43fd-8cc4-5ffa33cb17d8','Standard','No Capo','Easy','3dce3d79-4ac3-4c06-8bed-5b3c5f46324e');
/*!40000 ALTER TABLE `guitar_tab_other_req_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guitar_tuning_types`
--

DROP TABLE IF EXISTS `guitar_tuning_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guitar_tuning_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tuning` varchar(31) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guitar_tuning_types`
--

LOCK TABLES `guitar_tuning_types` WRITE;
/*!40000 ALTER TABLE `guitar_tuning_types` DISABLE KEYS */;
INSERT INTO `guitar_tuning_types` VALUES (1,'Standard'),(2,'Half-Step Down '),(3,'Perfect Fourth Tuning'),(4,'A Tuning'),(5,'B Tuning'),(6,'C Tuning'),(7,'C# Tuning'),(8,'Cb Tuning'),(9,'D Tuning'),(10,'Drop A'),(11,'Drop Bb'),(12,'Drop B'),(13,'Drop C'),(14,'Drop Db'),(15,'Drop D'),(16,'Open C'),(17,'Open D'),(18,'Open E'),(19,'Open G'),(20,'Celtic');
/*!40000 ALTER TABLE `guitar_tuning_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `harmonica_keys`
--

DROP TABLE IF EXISTS `harmonica_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `harmonica_keys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `harmonica_key` varchar(7) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `harmonica_keys`
--

LOCK TABLES `harmonica_keys` WRITE;
/*!40000 ALTER TABLE `harmonica_keys` DISABLE KEYS */;
INSERT INTO `harmonica_keys` VALUES (5,'C'),(6,'Db'),(7,'D'),(8,'Eb'),(9,'E'),(10,'F'),(11,'F#'),(12,'G'),(13,'Ab'),(14,'A'),(15,'Bb'),(16,'B');
/*!40000 ALTER TABLE `harmonica_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `harmonica_tab_lyrics`
--

DROP TABLE IF EXISTS `harmonica_tab_lyrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `harmonica_tab_lyrics` (
  `id` varchar(255) NOT NULL,
  `lyrics` mediumtext NOT NULL,
  `song_tab_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `song_tab_id` (`song_tab_id`),
  CONSTRAINT `harmonica_tab_lyrics_ibfk_1` FOREIGN KEY (`song_tab_id`) REFERENCES `song_tabs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `harmonica_tab_lyrics`
--

LOCK TABLES `harmonica_tab_lyrics` WRITE;
/*!40000 ALTER TABLE `harmonica_tab_lyrics` DISABLE KEYS */;
INSERT INTO `harmonica_tab_lyrics` VALUES ('27b9d695-5a4b-4799-aee6-4a97aa0ea9c0','6  6    -6   6  -6   6  -6   7\n1.AL-MOST HEAV-EN,WEST VIR-GIN-IA\n2.ALL MY MEM\'-RIES GATH-ER \'ROUND HER\n\n   -8   -8     8   -8   -6  -6  -6    6  6 -6 7\n1.BLUE RIDGE MOUN-TAINS,SHEN-AN-DOAH RIV-ER\n2.MIN-ER\'S LA-DY,STRAN-GER TO BLUE WA-TERS\n\n   6   6  -6   6    -6  7    7   8    8\n1.LIFE IS OLD THERE,OLD-ER THAN THE TREES\n2.DARK AND DUST-Y,PAINT-ED ON THE SKY\n\n   -8   -8  -8  -8    8  -8\n1.YOUNG-ER THAN THE MOUN-TAINS\n2.MIST-Y TASTE OF MOON-SHINE\n\n   -6   7    7 -8   7\n1.GROW-IN\' LIKE A BREEZE\n2.TEAR-DROP IN MY EYE\n\n  7  -8    8     8  7   -8    8 -8    7   8  9 -10\nCOUN-TRY ROADS,TAKE ME HOME  TO THE PLACE I BE-LONG\n\n-10  -10  9  8    8   -8   7  -8\nWEST VIR-GIN-IA,MOUN-TAIN MOM-MA\n\n 8   -8   7   7   -8    7\nTAKE ME HOME,COUN-TRY ROADS\n\n7  7    7    -7    7 -8   8    8    8    8    8    7\nI HEAR HER VOICE, IN THE MORN-ING HOURS SHE CALLS  ME.\n\n 7 -9  -9  -9   -9 -9  8  -8   7 -8 8  8  -8\nRA-DIO RE-MINDS ME OF MY HOME FAR A-WAY\n\n-8   8   8    8   8   -8 -8 -8 -8  7    7\nAND DRV-IN\' DOWN THE ROAD I GET A FEEL-IN\'\n\n  7  7    7     7   7   7\nTHAT I SHOULD HAVE BEEN HOME \n\n-8  8   -8  -8   8  -9\nYES-TER-DAY,YES-TER-DAY','470b4298-76b4-44fc-8f72-91652ad96f76'),('283b591a-a39b-4a33-b9c9-f22f40b75681','v=vibrato\n\nIntro\n-5V 5V -4  3 3 3\n3 -5 -5 -5 5 5 5 -4 3 3 3\n3 -5V 5V -4 3 3\n3 4 -3 3 3 3\n3 3 3 4 -3 \n\nAs you probably can hear, parts from the intro is being played several\ntimes with small variations later on in the song.\n\nThe \"Someone to love\" part:\n4 -3 3 x2\n\nThe \"Someone to love\" part later on without vocals:\n4 -3 3\n-4 4 -3 3\n4 -3 3\n-4 4 -3 3','ce4321ba-b690-464d-a31d-e23838f566bf');
/*!40000 ALTER TABLE `harmonica_tab_lyrics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `harmonica_tab_other_req_details`
--

DROP TABLE IF EXISTS `harmonica_tab_other_req_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `harmonica_tab_other_req_details` (
  `id` varchar(255) NOT NULL,
  `harmonica_type` varchar(31) NOT NULL,
  `harmonica_key` varchar(3) NOT NULL,
  `difficulty` varchar(15) NOT NULL,
  `song_tab_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `song_tab_id` (`song_tab_id`),
  CONSTRAINT `harmonica_tab_other_req_details_ibfk_1` FOREIGN KEY (`song_tab_id`) REFERENCES `song_tabs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `harmonica_tab_other_req_details`
--

LOCK TABLES `harmonica_tab_other_req_details` WRITE;
/*!40000 ALTER TABLE `harmonica_tab_other_req_details` DISABLE KEYS */;
INSERT INTO `harmonica_tab_other_req_details` VALUES ('a36adcbe-0779-48e2-a36e-82cc83371cf0','Diatonic','C','Easy','ce4321ba-b690-464d-a31d-e23838f566bf'),('f16d077d-cbbb-418e-9c15-1184ed72bf90','Diatonic','C','Easy','470b4298-76b4-44fc-8f72-91652ad96f76');
/*!40000 ALTER TABLE `harmonica_tab_other_req_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `harmonica_types`
--

DROP TABLE IF EXISTS `harmonica_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `harmonica_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `harmonica_type` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `harmonica_types`
--

LOCK TABLES `harmonica_types` WRITE;
/*!40000 ALTER TABLE `harmonica_types` DISABLE KEYS */;
INSERT INTO `harmonica_types` VALUES (1,'Diatonic'),(2,'Chromatic'),(3,'Tremolo'),(4,'Orchestral'),(5,'Octave'),(6,'Bass'),(7,'Chord'),(8,'Electric'),(9,'ChengGong'),(10,'Pitch pipe');
/*!40000 ALTER TABLE `harmonica_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lyrics_only_tab_lyrics`
--

DROP TABLE IF EXISTS `lyrics_only_tab_lyrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lyrics_only_tab_lyrics` (
  `id` varchar(255) NOT NULL,
  `song_tab_id` varchar(255) NOT NULL,
  `lyrics` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `song_tab_id` (`song_tab_id`),
  CONSTRAINT `lyrics_only_tab_lyrics_ibfk_1` FOREIGN KEY (`song_tab_id`) REFERENCES `song_tabs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lyrics_only_tab_lyrics`
--

LOCK TABLES `lyrics_only_tab_lyrics` WRITE;
/*!40000 ALTER TABLE `lyrics_only_tab_lyrics` DISABLE KEYS */;
INSERT INTO `lyrics_only_tab_lyrics` VALUES ('0388ff81-aebd-4000-9a02-612be82ec666','8a67bd6c-b54a-49e3-9533-475338e5b4e5','आज फर्की हेर्दा म धेरै नै पछि परेछु\nजीवनको मोडमा म अड्की बसेछु\nशून्यतामा अझै मलाई रमाउन देऊ न\nतिमी हाँस तर मलाई नरुवाउन\nमैले चाहेको दिन सक्छौ भने\nमैले मागेको दिन सक्छौ भने\nतिमी आऊ न, ओह-ओह-ओह\nतिमी आऊ न हामीसँगै\nबाचौँ न हामी सँगैसँगै\nबाचौँ न हामी सँगैसँगै\nआज मेरै मृत्यु कतै मलाई नै पर्खँदै छ\nसम्झौता यो किन? जब जीवन यो त्याग्नु नै छ\nदेखेको पाइन्न रे, लेखेको मात्रै किन?\nसत्यलाई अँगालेँ तर सत्य के हो?\nबुझ्नै सकिन, बुझ्नै सकिन\nजीवन त के हो र? सुस्केरामै बाँचिदिउँला\nमरिलानूँ के छ र? सम्झना यो साँचिदिउँला\nतिमी आऊ न, ओह-ओह-ओह\nतिमी आऊ न हामीसँगै\nबाचौँ न हामी सँगैसँगै\nबाचौँ न हामी सँगैसँगै\nबाचौँ न हामी सँगै\nजीवन त के हो र? सुस्केरामै बाँचिदिउँला\nमरिलानूँ के छ र? सम्झना यो साँचिदिउँला\nतिमी आऊ न, ओह-ओह-ओह\nतिमी आऊ न हामीसँगै\nबाचौँ न हामी सँगैसँगै\nबाचौँ न हामी सँगैसँगै\nबाचौँ न हामी सँगै'),('2c29ff8f-d747-4eef-a28b-b5458f0e707d','53779398-6261-429e-9d50-b4f14fb4181b','On bended knee is no way to be free\nLifting up an empty cup I ask silently\nThat all my destinations will accept the one that\'s me\nSo I can breathe\nCircles they grow and they swallow people whole\nHalf their lives they say goodnight to wive\'s they\'ll never know\nGot a mind full of questions and a teacher in my soul\nSo it goes\nDon\'t come closer or I\'ll have to go\nHolding me like gravity are places that pull\nIf ever there was someone to keep me at home\nIt would be you\nEveryone I come across in cages they bought\nThey think of me and my wandering\nBut I\'m never what they thought\nGot my indignation but I\'m pure in all my thoughts\nI\'m alive\nWind in my hair, I feel part of everywhere\nUnderneath my being is a road that disappeared\nLate at night I hear the trees\nThey\'re singing with the dead\nOverhead\nLeave it to me as I find a way to be\nConsider me a satellite forever orbiting\nI knew all the rules, but the rules do not know me\nGuaranteed'),('323a0f5f-de8f-4c3d-b671-5dd3d26efd61','a1b5a738-dbf6-49f5-be1d-588c36c607e7','(Intro: Dido)\nMy tea\'s gone cold, I\'m wondering why I\nGot out of bed at all\nThe morning rain clouds up my window\nAnd I can\'t see at all\nAnd even if I could, it\'d all be grey\nBut your picture on my wall\nIt reminds me that it\'s not so bad, it\'s not so bad\n\n(Chorus: Dido)\nMy tea\'s gone cold, I\'m wondering why I\nGot out of bed at all\nThe morning rain clouds up my window\nAnd I can\'t see at all\nAnd even if I could, it\'d all be grey\nBut your picture on my wall\nIt reminds me that it\'s not so bad, it\'s not so bad\n\n(Verse 1: Eminem)\nDear Slim, I wrote you, but you still ain\'t callin\'\nI left my cell, my pager and my home phone at the bottom\nI sent two letters back in autumn, you must not\'ve got \'em\nThere probably was a problem at the post office or somethin\'\nSometimes I scribble addresses too sloppy when I jot \'em\nBut anyways, fuck it, what\'s been up, man? How\'s your daughter?\nMy girlfriend\'s pregnant too, I\'m \'bout to be a father\nIf I have a daughter, guess what I\'ma call her?\nI\'ma name her Bonnie\nI read about your Uncle Ronnie too, I\'m sorry\nI had a friend kill himself over some bitch who didn\'t want him\nI know you probably hear this every day, but I\'m your biggest fan\nI even got the underground shit that you did with Skam\nI got a room full of your posters and your pictures, man\nI like the shit you did with Rawkus too, that shit was phat\nAnyways, I hope you get this, man, hit me back\nJust to chat, truly yours, your biggest fan, this is Stan\n\n(Chorus: Dido)\nMy tea\'s gone cold, I\'m wondering why I\nGot out of bed at all\nThe morning rain clouds up my window\nAnd I can\'t see at all\nAnd even if I could, it\'d all be grey\nBut your picture on my wall\nIt reminds me that it\'s not so bad, it\'s not so bad\n\n(Verse 2: Eminem)\nDear Slim, you still ain\'t called or wrote, I hope you have a chance\nI ain\'t mad, I just think it\'s fucked up you don\'t answer fans\nIf you didn\'t want to talk to me outside your concert, you didn\'t have to\nBut you coulda signed an autograph for Matthew\nThat\'s my little brother, man, he\'s only six years old\nWe waited in the blisterin\' cold\nFor you, for four hours, and you just said no\nThat\'s pretty shitty, man, you\'re like his fuckin\' idol\nHe wants to be just like you, man, he likes you more than I do\nI ain\'t that mad, though I just don\'t like bein\' lied to\nRemember when we met in Denver?\nYou said if I\'d write you, you would write back\nSee, I\'m just like you in a way: I never knew my father neither\nHe used to always cheat on my mom and beat her\nI can relate to what you\'re sayin\' in your songs\nSo when I have a shitty day, I drift away and put \'em on\n‘Cause I don\'t really got shit else\nSo that shit helps when I\'m depressed\nI even got a tattoo with your name across the chest\nSometimes I even cut myself to see how much it bleeds\nIt\'s like adrenaline, the pain is such a sudden rush for me\nSee, everything you say is real, and I respect you ‘cause you tell it\nMy girlfriend\'s jealous \'cause I talk about you 24/7\nBut she don\'t know you like I know you, Slim, no one does\nShe don\'t know what it was like for people like us growin\' up\nYou gotta call me, man, I\'ll be the biggest fan you\'ll ever lose\nSincerely yours, Stan—P.S. We should be together too\n\n(Chorus: Dido)\nMy tea\'s gone cold, I\'m wondering why I\nGot out of bed at all\nThe morning rain clouds up my window\nAnd I can\'t see at all\nAnd even if I could, it\'d all be grey\nBut your picture on my wall\nIt reminds me that it\'s not so bad, it\'s not so bad\n\n(Verse 3: Eminem)\nDear Mr. I\'m-Too-Good-to-Call-or-Write-My-Fans\nThis\'ll be the last package I ever send your ass\nIt\'s been six months, and still no word—I don\'t deserve it?\nI know you got my last two letters, I wrote the addresses on \'em perfect\nSo this is my cassette I\'m sendin\' you, I hope you hear it\nI\'m in the car right now, I\'m doin\' 90 on the freeway\nHey, Slim, I drank a fifth of vodka, you dare me to drive?\nYou know the song by Phil Collins, \"In the Air of the Night\"\nAbout that guy who coulda saved that other guy from drownin\'\nBut didn\'t, then Phil saw it all, then at a show he found him?\nThat\'s kinda how this is: you coulda rescued me from drownin\'\nNow it\'s too late, I\'m on a thousand downers now—I\'m drowsy\nAnd all I wanted was a lousy letter or a call\nI hope you know I ripped all of your pictures off the wall\nI loved you, Slim, we coulda been together—think about it!\nYou ruined it now, I hope you can\'t sleep and you dream about it\nAnd when you dream I hope you can\'t sleep and you scream about it\nI hope your conscience eats at you and you can\'t breathe without me\nSee, Slim—shut up, bitch! I\'m tryin\' to talk\nHey, Slim, that\'s my girlfriend screamin\' in the trunk\nBut I didn\'t slit her throat, I just tied her up—see? I ain\'t like you\n‘Cause if she suffocates she\'ll suffer more and then she\'ll die too\nWell, gotta go, I\'m almost at the bridge now\nOh, shit, I forgot—how am I supposed to send this shit out?!\n\n(Chorus: Dido)\nMy tea\'s gone cold, I\'m wondering why I\nGot out of bed at all\nThe morning rain clouds up my window\nAnd I can\'t see at all\nAnd even if I could, it\'d all be grey\nBut your picture on my wall\nIt reminds me that it\'s not so bad, it\'s not so bad\n\n(Verse 4: Eminem)\nDear Stan, I meant to write you sooner, but I just been busy\nYou said your girlfriend\'s pregnant now, how far along is she?\nLook, I\'m really flattered you would call your daughter that\nAnd here\'s an autograph for your brother; I wrote it on a Starter cap\nI\'m sorry I didn\'t see you at the show, I must\'ve missed you\nDon\'t think I did that shit intentionally just to diss you\nBut what\'s this shit you said about you like to cut your wrists too?\nI say that shit just clownin\', dawg, come on, how fucked up is you?\nYou got some issues, Stan, I think you need some counselin\'\nTo help your ass from bouncin\' off the walls when you get down some\nAnd what\'s this shit about us meant to be together?\nThat type of shit\'ll make me not want us to meet each other\nI really think you and your girlfriend need each other\nOr maybe you just need to treat her better\nI hope you get to read this letter, I just hope it reaches you in time\nBefore you hurt yourself, I think that you\'ll be doin\' just fine\nIf you relax a little, I\'m glad I inspire you, but Stan\nWhy are you so mad? Try to understand that I do want you as a fan\nI just don\'t want you to do some crazy shit\nI seen this one shit on the news a couple weeks ago that made me sick\nSome dude was drunk and drove his car over a bridge\nAnd had his girlfriend in the trunk, and she was pregnant with his kid\nAnd in the car they found a tape, but they didn\'t say who it was to\nCome to think about it, his name was—it was you\nDamn…'),('85dee6af-3090-4396-8f8f-7374075807de','e0d89006-39d9-475b-a2bf-cbf4dab259fe','त्यतिकै छोड न केशलाई\nउडाउन देऊ हावालाई\nडुब्छु होला तिम्रा आँखामै\nडुबिरहन छ त्यहीँ मलाई\nम, म माया मार्दिन, तिमीलाई छाड्दिन\nम माया मार्दिन\nतिमी मनमा छौ मेरो, सम्झना हौ मेरो\nकहिल्यै बिर्सिन्न\nछाया हौ कहिल्यै नछुट्ने\nसपना हौ हररात आउने\nए, मन यो कहिल्यै नमर्ने\nतिम्लाई सम्झी\nतिम्लाई सम्झी'),('91e7ee18-c4af-4a72-823d-d5aaeac0f700','eed2f1b5-a8b4-48e6-9a07-55e948762637','Well it\'s your hometown\nI think I\'ve outgrown\nI wanna travel the world but I, I just can\'t do it alone\nSo I\'m just waiting on fate to come.\nWrap around me\nThink about all the foreign places we could be\nI\'ll be flicking stones at your window\nI\'ll be waiting outside \'til you\'re ready to go\nWon\'t you come down? Come away with me\nJust think of all the places we could be\nI\'ll be waiting, waiting on a brand new day\nRiding on waves, walking on sand\nDigging in caves to find the treasures of the land\nAnd if we find gold\nWell, we\'ll just throw it away\nWe can write stories bout the journeys that we made\n(We could be big in Japan)\nI\'ll be flicking stones at your window\nI\'ll be waiting outside \'til you\'re ready to go\nWon\'t you come down? Come away with me\nJust think of all the places we could be\nI\'ll be waiting, waiting on a brand new day\nWaiting on a brand new day\nThey said they\'ll keep me here\nBut I couldn\'t do another year\nI said I\'ll see you soon\nBecause I whistle to a different tune\nThink of all the places we could be\nThink of all the people we could meet\nI\'ll be flicking stones at your window\nI\'ll be waiting outside \'til you\'re ready to go\nWon\'t you come down? Come away with me\nThink of all the places we could be\nI\'ll be waiting, waiting on a brand new day'),('cbbf6a96-2a6b-4f6f-bd7c-67081b5ac7a9','3b1609c1-33f4-4851-9e31-9f16f7be5583','One night to be confused\nOne night to speed up truth\nWe had a promise made\nFour hands and then away\nBoth under influence\nWe had divine sense\nTo know what to say\nMind is a razor blade\nTo call for hands of above, to lean on\nWouldn\'t be good enough for me, no\nOne night of magic rush\nThe start, a simple touch\nOne night to push and scream\nAnd then relief\nTen days of perfect tunes\nThe colours red and blue\nWe had a promise made\nWe were in love\nTo call for hands of above, to lean on\nWouldn\'t be good enough for me, oh\nTo call for hands of above, to lean on\nWouldn\'t be good enough for me\nAnd you\nYou knew the hand of the devil\nAnd you\nKept us awake with wolves\' teeth\nSharing different heartbeats in one night\nTo call for hands of above, to lean on\nWouldn\'t be good enough for me\nTo call for hands of above, to lean on\nWouldn\'t be good enough for me');
/*!40000 ALTER TABLE `lyrics_only_tab_lyrics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_artists_join_phrases`
--

DROP TABLE IF EXISTS `other_artists_join_phrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `other_artists_join_phrases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `join_phrase` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_artists_join_phrases`
--

LOCK TABLES `other_artists_join_phrases` WRITE;
/*!40000 ALTER TABLE `other_artists_join_phrases` DISABLE KEYS */;
INSERT INTO `other_artists_join_phrases` VALUES (1,'feat.'),(2,'and'),(3,'meets'),(4,'with'),(5,','),(6,'&'),(7,'+'),(8,'x'),(9,'/'),(10,'w/'),(11,'vs.');
/*!40000 ALTER TABLE `other_artists_join_phrases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_tab_other_artists`
--

DROP TABLE IF EXISTS `song_tab_other_artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song_tab_other_artists` (
  `id` varchar(255) NOT NULL,
  `song_tab_id` varchar(255) NOT NULL,
  `join_word` varchar(15) NOT NULL,
  `other_artist_name` varchar(127) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `song_tab_id` (`song_tab_id`),
  CONSTRAINT `song_tab_other_artists_ibfk_1` FOREIGN KEY (`song_tab_id`) REFERENCES `song_tabs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_tab_other_artists`
--

LOCK TABLES `song_tab_other_artists` WRITE;
/*!40000 ALTER TABLE `song_tab_other_artists` DISABLE KEYS */;
INSERT INTO `song_tab_other_artists` VALUES ('58f6251a-70ea-4918-83bf-382c3e600615','a1b5a738-dbf6-49f5-be1d-588c36c607e7','feat.','Dido');
/*!40000 ALTER TABLE `song_tab_other_artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_tabs`
--

DROP TABLE IF EXISTS `song_tabs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song_tabs` (
  `id` varchar(255) NOT NULL,
  `song_title` varchar(128) NOT NULL,
  `artist_name` varchar(128) NOT NULL,
  `tab_type` varchar(45) NOT NULL,
  `creator_username` varchar(45) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_tabs`
--

LOCK TABLES `song_tabs` WRITE;
/*!40000 ALTER TABLE `song_tabs` DISABLE KEYS */;
INSERT INTO `song_tabs` VALUES ('3b1609c1-33f4-4851-9e31-9f16f7be5583','Heartbeats','The Knife','LYRICS','sabin_b_99','2023-11-14 13:53:07'),('3dce3d79-4ac3-4c06-8bed-5b3c5f46324e','Enchanted','Taylor Swift','GUITAR',NULL,NULL),('470b4298-76b4-44fc-8f72-91652ad96f76','Take Me Home Country Roads','John Denver','HARMONICA',NULL,NULL),('53779398-6261-429e-9d50-b4f14fb4181b','Guranteed','Pearl Jam','LYRICS',NULL,NULL),('8a67bd6c-b54a-49e3-9533-475338e5b4e5','Sangai Bachauna','The Monkey Temple Nepal','LYRICS','sabin_b_99','2023-11-14 08:02:31'),('a1b5a738-dbf6-49f5-be1d-588c36c607e7','Stan','Eminem','LYRICS',NULL,NULL),('ce4321ba-b690-464d-a31d-e23838f566bf','Love Me Do (harp parts)','The Beatles','HARMONICA',NULL,NULL),('e0d89006-39d9-475b-a2bf-cbf4dab259fe','Sadhana','John Chamling Rai','LYRICS',NULL,NULL),('e78cba2d-c448-4709-b299-f2b914dfee28','Test song','Test artistName','LYRICS','sabin_b_99','2023-11-14 13:57:09'),('eed2f1b5-a8b4-48e6-9a07-55e948762637','Brand New Day','Kodaline','LYRICS',NULL,NULL);
/*!40000 ALTER TABLE `song_tabs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tab_difficulty_levels`
--

DROP TABLE IF EXISTS `tab_difficulty_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tab_difficulty_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `difficulty` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tab_difficulty_levels`
--

LOCK TABLES `tab_difficulty_levels` WRITE;
/*!40000 ALTER TABLE `tab_difficulty_levels` DISABLE KEYS */;
INSERT INTO `tab_difficulty_levels` VALUES (1,'Easy'),(2,'Medium'),(3,'Hard');
/*!40000 ALTER TABLE `tab_difficulty_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tab_ratings`
--

DROP TABLE IF EXISTS `tab_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tab_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `tab_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tab_ratings`
--

LOCK TABLES `tab_ratings` WRITE;
/*!40000 ALTER TABLE `tab_ratings` DISABLE KEYS */;
INSERT INTO `tab_ratings` VALUES (2,5,'53779398-6261-429e-9d50-b4f14fb4181b','99d30f94-540a-4a0b-95a4-c22438ed5e9e'),(3,4,'53779398-6261-429e-9d50-b4f14fb4181b','125d1bdf-3396-4a68-9dec-84dc36de191e'),(4,3,'3dce3d79-4ac3-4c06-8bed-5b3c5f46324e','125d1bdf-3396-4a68-9dec-84dc36de191e'),(5,5,'3dce3d79-4ac3-4c06-8bed-5b3c5f46324e','99d30f94-540a-4a0b-95a4-c22438ed5e9e'),(6,4,'470b4298-76b4-44fc-8f72-91652ad96f76','99d30f94-540a-4a0b-95a4-c22438ed5e9e'),(7,4,'a1b5a738-dbf6-49f5-be1d-588c36c607e7','99d30f94-540a-4a0b-95a4-c22438ed5e9e'),(8,3,'a1b5a738-dbf6-49f5-be1d-588c36c607e7','125d1bdf-3396-4a68-9dec-84dc36de191e'),(9,4,'8a67bd6c-b54a-49e3-9533-475338e5b4e5','99d30f94-540a-4a0b-95a4-c22438ed5e9e');
/*!40000 ALTER TABLE `tab_ratings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-30 10:18:17
