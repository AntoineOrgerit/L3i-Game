CREATE DATABASE  IF NOT EXISTS `l3igame` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `l3igame`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: l3igame
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `theme_UNIQUE` (`theme`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (2,'Qui a écrit l\'article ?'),(4,'Qui a fait quoi ?'),(1,'Qui travaille avec qui ?'),(3,'Qui travaille sur ce projet ?');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveau` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `intitule_UNIQUE` (`intitule`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveau`
--

LOCK TABLES `niveau` WRITE;
/*!40000 ALTER TABLE `niveau` DISABLE KEYS */;
INSERT INTO `niveau` VALUES (3,'Difficile'),(1,'Facile'),(2,'Moyen');
/*!40000 ALTER TABLE `niveau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_categorie` int(11) NOT NULL,
  `id_niveau` int(11) NOT NULL,
  `intitule` text NOT NULL,
  `image` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_categorie_fk_idx` (`id_categorie`),
  KEY `id_niveau_fk_idx` (`id_niveau`),
  CONSTRAINT `id_categorie_fk` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id`),
  CONSTRAINT `id_niveau_fk` FOREIGN KEY (`id_niveau`) REFERENCES `niveau` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_response`
--

DROP TABLE IF EXISTS `question_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_response` (
  `id_question` int(11) NOT NULL,
  `id_reponse` int(11) NOT NULL,
  PRIMARY KEY (`id_question`,`id_reponse`),
  KEY `id_reponse_fk_idx` (`id_reponse`),
  CONSTRAINT `id_question_fk` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`),
  CONSTRAINT `id_reponse_fk` FOREIGN KEY (`id_reponse`) REFERENCES `reponse` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_response`
--

LOCK TABLES `question_response` WRITE;
/*!40000 ALTER TABLE `question_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse`
--

DROP TABLE IF EXISTS `reponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `intitule_UNIQUE` (`intitule`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse`
--

LOCK TABLES `reponse` WRITE;
/*!40000 ALTER TABLE `reponse` DISABLE KEYS */;
INSERT INTO `reponse` VALUES (103,'Adyson Magalhães Maia'),(119,'Ahmed Hamdi'),(4,'Alain Bouju'),(14,'Alain Gaugue'),(126,'Anh Thu Phan Ho'),(10,'Antoine Doucet'),(27,'Armelle Prigent'),(30,'Arnaud Revel'),(121,'Axel Jean-Caurent'),(113,'Bah Hui Tran'),(109,'Cécilia Ostertag'),(9,'Christophe Demko'),(127,'Christophe Rigaud'),(12,'Cyril Faucher'),(38,'Damien Mondou'),(102,'Duc Hung Luong'),(35,'El-Hadi Zahzah'),(36,'Elhadi Belghache'),(93,'Esteban Frossard'),(1,'Farid Ammar-Boudjelal'),(100,'Florian Lardeux'),(3,'Frédéric Bertrand'),(19,'Georges Louis'),(116,'Hamza Ben Ammar'),(98,'Hanen Khlif'),(40,'Hicham Slimani'),(120,'Hoang Nam Ho'),(37,'Ismaël Bennis'),(24,'Jacques Morcos'),(18,'Jamal Khamlichi'),(20,'Jamal Malki'),(5,'Jean-Christophe Burie'),(33,'Jean-François Viaud'),(17,'Jean-Loup Guillaume'),(26,'Jean-Marc Ogier'),(92,'Jordan Drapeau'),(114,'Joris Voerman'),(104,'Julien Maitre'),(128,'Kais Rouis'),(2,'Karell Bertet'),(87,'Lady Viviana Beltrán Beltrán'),(122,'Louisa Kessi'),(97,'Made Windu Antara Kesiman'),(117,'Marie Neige Chapel'),(32,'Marie-Hélène Verrons Baudoux'),(95,'Marwa Hamdi'),(31,'Matthieu Robert'),(22,'Michel Ménard'),(8,'Mickaël Coustaty'),(15,'Mohamed Yacine Ghamri-Doudane'),(106,'Mohammad Nasiruddin'),(28,'Mourad Rabah'),(34,'Muriel Visani'),(124,'Nhu Khoa Nguyen'),(125,'Nhu Van Nguyen'),(39,'Nicolas Sidere'),(112,'Nicolas Texier'),(96,'Noudehouenou Lionel Jaderne Houssou'),(94,'Nour Haidar'),(129,'Nouredine Tamani'),(11,'Pascal Estraillier'),(29,'Patrice Raveneau'),(13,'Patrick Franco'),(16,'Petra Gomez-Krämer'),(118,'Quoc Bao Dang'),(25,'Rémy Mullot'),(6,'Ronan Champagnat'),(115,'Sabrine Aroua'),(88,'Salah Eddine Boukhetta'),(89,'Soraya Chachoua'),(21,'Sylvain Marchand'),(23,'Sylvain Michelin'),(101,'Than Nam Le'),(107,'Thanh Khoa Nguyen'),(108,'Thi Tuyet Hai Nguyen'),(91,'Thierry Deschamps-De-Paillette'),(110,'Valentin Owczarek'),(7,'Vincent Courboulay'),(105,'Vincent Merelle'),(111,'Vincent Poulain D\'andecy'),(90,'Vinh Loc Cu'),(99,'Wafa Khlif'),(85,'Zied Aouini'),(123,'Zuheng Ming');
/*!40000 ALTER TABLE `reponse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-12 16:48:48
