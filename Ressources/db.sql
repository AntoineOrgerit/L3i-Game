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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
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
-- Table structure for table `indice`
--

DROP TABLE IF EXISTS `indice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `priorite` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indice`
--

LOCK TABLES `indice` WRITE;
/*!40000 ALTER TABLE `indice` DISABLE KEYS */;
INSERT INTO `indice` VALUES (1,'C\'est l\'actuel Président de l\'Université.',2),(2,'Il ne se consacre plus vraiment à la recherche désormais.',1),(3,'L\'ensemble de ses travaux porte sur les modélisations et métamodélisation.',1),(4,'Certaines personnes portent des travaux sur le thème des treillis.',1),(5,'Il travaille sur l\'application de modèles objets aux données géoréférencées.',2);
/*!40000 ALTER TABLE `indice` ENABLE KEYS */;
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
  `points` int(11) NOT NULL,
  `penalite_mauvaise_reponse` int(11) NOT NULL,
  `temps_basse_limite` int(11) NOT NULL,
  `temps_haute_limite` int(11) NOT NULL,
  `coefficient_temps_basse_limite` float(4,2) NOT NULL,
  `coefficient_temps_haute_limite` float(4,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `intitule_UNIQUE` (`intitule`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveau`
--

LOCK TABLES `niveau` WRITE;
/*!40000 ALTER TABLE `niveau` DISABLE KEYS */;
INSERT INTO `niveau` VALUES (1,'Facile',100,5,210,300,1.10,0.90),(2,'Moyen',200,15,300,420,1.25,0.80),(3,'Difficile',300,22,420,540,1.35,0.70);
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
  `intitule` text,
  `image` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_categorie_fk_idx` (`id_categorie`),
  KEY `id_niveau_fk_idx` (`id_niveau`),
  CONSTRAINT `id_categorie_fk` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id`),
  CONSTRAINT `id_niveau_fk` FOREIGN KEY (`id_niveau`) REFERENCES `niveau` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,2,2,'Qui a participé à l\'écriture de l\'article : \" Analyse d’Images de Documents Anciens : une Approche Texture\" ?',NULL),(2,3,1,'Qui développe la librairie de manipulation des treillis ?',NULL),(3,1,2,'Qui sont les directeurs de thèse de Damien Mondou ?',NULL),(4,3,1,'Qui est impliqué dans les projets Art et Sciences ?',NULL),(5,2,3,'Qui a participé à l\'écriture de l\'article : \"Une approche ontologique pour la structuration de données spatio-temporelles de trajectoires : Application à l’étude des déplacements de mammifères marins\" ?',NULL),(6,3,2,'Qui travaille sur les scénarios interactifs et la scénarisation adaptive ?',NULL),(7,2,2,'Qui a écrit l\'article \"Reconnaissance de symboles à partir d’une signature structurelle flexible et d’un classifieur de type treillis de Galois.\" ?',NULL),(8,2,3,'Qui a écrit l\'article \"Système générique et omni-langage de navigation dans des bases de documents anciens basé sur de la recherche de mots par composition interactive de requêtes.\" ?',NULL),(9,1,3,'Qui ont été les directeurs de thèse de Jean-François Viaud ?',NULL),(10,3,1,'Qui a effectué une thèse sur le thème des treillis ?',NULL),(11,3,2,'Qui travaille à résoudre les conflits d\'interaction dans les systèmes multi-agents ?',NULL),(12,2,3,'Qui a écrit l\'article \"Genca : un modèle général de négociation de contrats.\" ?',NULL),(13,3,2,'Qui travaile sur l’intégration des traces d’exécution dans les mécanismes de pilotage des applications ?',NULL),(14,2,3,'Qui a écrit l\'article \"Aide à l’analyse des parcours d’apprentissage en IUT par reconnaissance de procédés et recommandations à base de traces\" ?',NULL),(15,3,3,'Qui travaille sur l\'adaptation dynamique des contenus, notamment par scénarisation ?',NULL),(16,2,3,'Qui a écrit l\'article \"Scénarisation et exécution adaptative\" ?',NULL),(17,3,2,'Qui travaille sur les problématiques et techniques liées à l\'indexation ?',NULL),(18,1,1,'Qui était le directeur de thèse de Mickael Coustaty ?',NULL),(19,1,1,'Qui était le directeur de thèse de Frédéric Bertrand ?',NULL),(20,1,1,'Quels chercheurs font partie de l’équipe de projet eBDthèque ?',NULL),(21,1,2,'Quels chercheurs font partie de l’équipe de projet SHADES ?',NULL),(22,1,2,'Quels chercheurs font partie de l’équipe de projet Chaire d’excellence ‘Gestion du conflit et de l’après-conflit’?',NULL),(23,2,1,'Qui a écrit l’article ‘Generation algorithm of a concept lattice with limited object access’ ?',NULL),(24,2,1,'Qui a écrit l’article ‘Vers une réduction du fossé sémantique dans le traitement des images de documents anciens à base d’ontologies : Application aux lettrines’ ?',NULL),(25,2,2,'Qui a écrit l’article ‘Real-time face tracking for attention aware adaptive games’ ?',NULL),(26,2,2,'Qui a écrit l’article ‘A new shape descriptor working in Discrete Cosine space : application to graphical symbols recognition’ ?',NULL),(27,3,2,'Qui travaille les extractions et les manipulations de connaissances ?',NULL),(28,3,3,'Qui travaille sur la modélisation d’expressions temporelles exprimant une périodicité ?',NULL),(29,3,3,'Qui travaille sur le pilotage de récits interactifs ?',NULL),(30,3,3,'Qui travaille sur la mobilité et l’intégration des données ?',NULL),(31,4,2,NULL,'img/category4/DSC_0514.JPG'),(32,4,2,NULL,'img/category4/DSC_0515.JPG'),(33,4,3,NULL,'img/category4/DSC_0516.JPG'),(34,4,1,NULL,'img/category4/DSC_0517.JPG'),(35,4,2,NULL,'img/category4/DSC_0518.JPG'),(36,4,2,NULL,'img/category4/DSC_0519.JPG'),(37,4,2,NULL,'img/category4/DSC_0520.JPG'),(38,4,1,NULL,'img/category4/DSC_0521.JPG'),(39,4,2,NULL,'img/category4/DSC_0522.JPG'),(40,4,3,NULL,'img/category4/DSC_0523.JPG'),(41,4,3,NULL,'img/category4/DSC_0524.JPG'),(42,4,2,NULL,'img/category4/DSC_0525.JPG'),(43,4,1,NULL,'img/category4/DSC_0526.JPG'),(44,4,2,NULL,'img/category4/DSC_0527.JPG'),(46,4,1,NULL,'img/category4/DSC_0529.JPG'),(47,4,3,NULL,'img/category4/DSC_0530.JPG');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_indice`
--

DROP TABLE IF EXISTS `question_indice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_indice` (
  `id_question` int(11) NOT NULL,
  `id_indice` int(11) NOT NULL,
  PRIMARY KEY (`id_question`,`id_indice`),
  KEY `question_indice_ibfk_1` (`id_indice`),
  CONSTRAINT `question_indice_ibfk_1` FOREIGN KEY (`id_indice`) REFERENCES `indice` (`id`),
  CONSTRAINT `question_indice_ibfk_2` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_indice`
--

LOCK TABLES `question_indice` WRITE;
/*!40000 ALTER TABLE `question_indice` DISABLE KEYS */;
INSERT INTO `question_indice` VALUES (18,1),(18,2),(19,3),(20,4),(19,5);
/*!40000 ALTER TABLE `question_indice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_reponse`
--

DROP TABLE IF EXISTS `question_reponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_reponse` (
  `id_question` int(11) NOT NULL,
  `id_reponse` int(11) NOT NULL,
  PRIMARY KEY (`id_question`,`id_reponse`),
  KEY `id_reponse_fk_idx` (`id_reponse`),
  CONSTRAINT `id_question_fk` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`),
  CONSTRAINT `id_reponse_fk` FOREIGN KEY (`id_reponse`) REFERENCES `reponse` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_reponse`
--

LOCK TABLES `question_reponse` WRITE;
/*!40000 ALTER TABLE `question_reponse` DISABLE KEYS */;
INSERT INTO `question_reponse` VALUES (2,2),(9,2),(20,2),(23,2),(24,2),(34,2),(35,2),(36,2),(28,3),(5,4),(24,4),(30,4),(39,4),(20,5),(21,5),(33,5),(35,5),(36,5),(37,5),(40,5),(44,5),(14,6),(16,6),(29,6),(22,7),(25,7),(36,7),(7,8),(21,8),(24,8),(41,8),(42,8),(47,8),(9,9),(23,9),(27,9),(16,11),(25,11),(46,12),(26,13),(21,16),(22,16),(38,16),(41,16),(43,16),(47,17),(19,19),(24,19),(43,22),(1,25),(8,25),(26,25),(7,26),(16,26),(18,26),(20,26),(21,26),(22,26),(26,26),(33,26),(35,26),(36,26),(37,26),(38,26),(40,26),(41,26),(42,26),(3,27),(6,27),(15,27),(16,27),(25,27),(46,27),(13,28),(14,28),(3,30),(4,30),(20,30),(34,30),(35,30),(46,30),(11,32),(12,32),(10,33),(7,34),(8,34),(32,34),(46,38),(40,90),(44,92),(47,107),(42,125),(31,127),(33,127),(35,127);
/*!40000 ALTER TABLE `question_reponse` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse`
--

LOCK TABLES `reponse` WRITE;
/*!40000 ALTER TABLE `reponse` DISABLE KEYS */;
INSERT INTO `reponse` VALUES (103,'Adyson Magalhães Maia'),(119,'Ahmed Hamdi'),(4,'Alain Bouju'),(14,'Alain Gaugue'),(126,'Anh Thu Phan Ho'),(10,'Antoine Doucet'),(27,'Armelle Prigent'),(30,'Arnaud Revel'),(121,'Axel Jean-Caurent'),(113,'Bah Hui Tran'),(109,'Cécilia Ostertag'),(9,'Christophe Demko'),(127,'Christophe Rigaud'),(12,'Cyril Faucher'),(38,'Damien Mondou'),(102,'Duc Hung Luong'),(35,'El-Hadi Zahzah'),(36,'Elhadi Belghache'),(93,'Esteban Frossard'),(1,'Farid Ammar-Boudjelal'),(100,'Florian Lardeux'),(3,'Frédéric Bertrand'),(19,'Georges Louis'),(116,'Hamza Ben Ammar'),(98,'Hanen Khlif'),(40,'Hicham Slimani'),(120,'Hoang Nam Ho'),(37,'Ismaël Bennis'),(24,'Jacques Morcos'),(18,'Jamal Khamlichi'),(20,'Jamal Malki'),(5,'Jean-Christophe Burie'),(33,'Jean-François Viaud'),(17,'Jean-Loup Guillaume'),(26,'Jean-Marc Ogier'),(92,'Jordan Drapeau'),(114,'Joris Voerman'),(104,'Julien Maitre'),(128,'Kais Rouis'),(2,'Karell Bertet'),(87,'Lady Viviana Beltrán Beltrán'),(122,'Louisa Kessi'),(97,'Made Windu Antara Kesiman'),(117,'Marie Neige Chapel'),(32,'Marie-Hélène Verrons Baudoux'),(95,'Marwa Hamdi'),(31,'Matthieu Robert'),(22,'Michel Ménard'),(8,'Mickaël Coustaty'),(15,'Mohamed Yacine Ghamri-Doudane'),(106,'Mohammad Nasiruddin'),(28,'Mourad Rabah'),(34,'Muriel Visani'),(124,'Nhu Khoa Nguyen'),(125,'Nhu Van Nguyen'),(39,'Nicolas Sidere'),(112,'Nicolas Texier'),(96,'Noudehouenou Lionel Jaderne Houssou'),(94,'Nour Haidar'),(129,'Nouredine Tamani'),(11,'Pascal Estraillier'),(29,'Patrice Raveneau'),(13,'Patrick Franco'),(16,'Petra Gomez-Krämer'),(118,'Quoc Bao Dang'),(25,'Rémy Mullot'),(6,'Ronan Champagnat'),(115,'Sabrine Aroua'),(88,'Salah Eddine Boukhetta'),(89,'Soraya Chachoua'),(21,'Sylvain Marchand'),(23,'Sylvain Michelin'),(101,'Than Nam Le'),(107,'Thanh Khoa Nguyen'),(108,'Thi Tuyet Hai Nguyen'),(91,'Thierry Deschamps-De-Paillette'),(110,'Valentin Owczarek'),(7,'Vincent Courboulay'),(105,'Vincent Merelle'),(111,'Vincent Poulain D\'andecy'),(90,'Vinh Loc Cu'),(99,'Wafa Khlif'),(85,'Zied Aouini'),(123,'Zuheng Ming');
/*!40000 ALTER TABLE `reponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1,110),(2,110),(3,10),(4,150),(5,600),(6,635),(7,815),(8,30),(9,565),(10,280),(11,320),(12,110),(13,110),(14,0),(15,0),(16,70),(17,0),(18,0),(19,0);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-26 15:09:00
