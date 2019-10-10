-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 10 oct. 2019 à 13:04
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `l3igame`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `theme_UNIQUE` (`theme`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `theme`) VALUES
(2, 'Qui a écrit l\'article ?'),
(4, 'Qui a fait quoi ?'),
(1, 'Qui travaille avec qui ?'),
(3, 'Qui travaille sur ce projet ?');

-- --------------------------------------------------------

--
-- Structure de la table `indice`
--

DROP TABLE IF EXISTS `indice`;
CREATE TABLE IF NOT EXISTS `indice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` text COLLATE utf8_bin NOT NULL,
  `priorite` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `indice`
--

INSERT INTO `indice` (`id`, `intitule`, `priorite`) VALUES
(1, 'C\'est l\'actuel Président de l\'Université.', 2),
(2, 'Il ne se consacre plus vraiment à la recherche désormais.', 1),
(3, 'L\'ensemble de ses travaux porte sur les modélisations et métamodélisation.', 1),
(4, 'Certaines personnes portent des travaux sur le thème des treillis.', 1),
(5, 'Il travaille sur l\'application de modèles objets aux données géoréférencées.', 2);

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
CREATE TABLE IF NOT EXISTS `niveau` (
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

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`id`, `intitule`, `points`, `penalite_mauvaise_reponse`, `temps_basse_limite`, `temps_haute_limite`, `coefficient_temps_basse_limite`, `coefficient_temps_haute_limite`) VALUES
(1, 'Facile', 100, 5, 210, 300, 1.10, 0.90),
(2, 'Moyen', 200, 15, 300, 420, 1.25, 0.80),
(3, 'Difficile', 300, 22, 420, 540, 1.35, 0.70);

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_categorie` int(11) NOT NULL,
  `id_niveau` int(11) NOT NULL,
  `intitule` text NOT NULL,
  `image` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_categorie_fk_idx` (`id_categorie`),
  KEY `id_niveau_fk_idx` (`id_niveau`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`id`, `id_categorie`, `id_niveau`, `intitule`, `image`) VALUES
(1, 2, 2, 'Qui a participé à l\'écriture de l\'article : \" Analyse d’Images de Documents Anciens : une Approche Texture\" ?', NULL),
(2, 3, 1, 'Qui développe la librairie de manipulation des treillis ?', NULL),
(3, 1, 2, 'Qui sont les directeurs de thèse de Damien Mondou ?', NULL),
(4, 3, 1, 'Qui est impliqué dans les projets Art et Sciences ?', NULL),
(5, 2, 3, 'Qui a participé à l\'écriture de l\'article : \"Une approche ontologique pour la structuration de données spatio-temporelles de trajectoires : Application à l’étude des déplacements de mammifères marins\" ?', NULL),
(6, 3, 2, 'Qui travaille sur les scénarios interactifs et la scénarisation adaptive ?', NULL),
(7, 2, 2, 'Qui a écrit l\'article \"Reconnaissance de symboles à partir d’une signature structurelle flexible et d’un classifieur de type treillis de Galois.\" ?', NULL),
(8, 2, 3, 'Qui a écrit l\'article \"Système générique et omni-langage de navigation dans des bases de documents anciens basé sur de la recherche de mots par composition interactive de requêtes.\" ?', NULL),
(9, 1, 3, 'Qui ont été les directeurs de thèse de Jean-François Viaud ?', NULL),
(10, 3, 1, 'Qui a effectué une thèse sur le thème des treillis ?', NULL),
(11, 3, 2, 'Qui travaille à résoudre les conflits d\'interaction dans les systèmes multi-agents ?', NULL),
(12, 2, 3, 'Qui a écrit l\'article \"Genca : un modèle général de négociation de contrats.\" ?', NULL),
(13, 3, 2, 'Qui travaile sur l’intégration des traces d’exécution dans les mécanismes de pilotage des applications ?', NULL),
(14, 2, 3, 'Qui a écrit l\'article \"Aide à l’analyse des parcours d’apprentissage en IUT par reconnaissance de procédés et recommandations à base de traces\" ?', NULL),
(15, 3, 3, 'Qui travaille sur l\'adaptation dynamique des contenus, notamment par scénarisation ?', NULL),
(16, 2, 3, 'Qui a écrit l\'article \"Scénarisation et exécution adaptative\" ?', NULL),
(17, 3, 2, 'Qui travaille sur les problématiques et techniques liées à l\'indexation ?', NULL),
(18, 1, 1, 'Qui était le directeur de thèse de Mickael Coustaty ?', NULL),
(19, 1, 1, 'Qui était le directeur de thèse de Frédéric Bertrand ?', NULL),
(20, 1, 1, 'Quels chercheurs font partie de l’équipe de projet eBDthèque ?', NULL),
(21, 1, 2, 'Quels chercheurs font partie de l’équipe de projet SHADES ?', NULL),
(22, 1, 2, 'Quels chercheurs font partie de l’équipe de projet Chaire d’excellence ‘Gestion du conflit et de l’après-conflit’?', NULL),
(23, 2, 1, 'Qui a écrit l’article ‘Generation algorithm of a concept lattice with limited object access’ ?', NULL),
(24, 2, 1, 'Qui a écrit l’article ‘Vers une réduction du fossé sémantique dans le traitement des images de documents anciens à base d’ontologies : Application aux lettrines’ ?', NULL),
(25, 2, 2, 'Qui a écrit l’article ‘Real-time face tracking for attention aware adaptive games’ ?', NULL),
(26, 2, 2, 'Qui a écrit l’article ‘A new shape descriptor working in Discrete Cosine space : application to graphical symbols recognition’ ?', NULL),
(27, 3, 2, 'Qui travaille les extractions et les manipulations de connaissances ?', NULL),
(28, 3, 3, 'Qui travaille sur la modélisation d’expressions temporelles exprimant une périodicité ?', NULL),
(29, 3, 3, 'Qui travaille sur le pilotage de récits interactifs ?', NULL),
(30, 3, 3, 'Qui travaille sur la mobilité et l’intégration des données ?', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `question_indice`
--

DROP TABLE IF EXISTS `question_indice`;
CREATE TABLE IF NOT EXISTS `question_indice` (
  `id_question` int(11) NOT NULL,
  `id_indice` int(11) NOT NULL,
  PRIMARY KEY (`id_question`,`id_indice`),
  KEY `question_indice_ibfk_1` (`id_indice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `question_indice`
--

INSERT INTO `question_indice` (`id_question`, `id_indice`) VALUES
(18, 1),
(18, 2),
(19, 3),
(20, 4),
(19, 5);

-- --------------------------------------------------------

--
-- Structure de la table `question_reponse`
--

DROP TABLE IF EXISTS `question_reponse`;
CREATE TABLE IF NOT EXISTS `question_reponse` (
  `id_question` int(11) NOT NULL,
  `id_reponse` int(11) NOT NULL,
  PRIMARY KEY (`id_question`,`id_reponse`),
  KEY `id_reponse_fk_idx` (`id_reponse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `question_reponse`
--

INSERT INTO `question_reponse` (`id_question`, `id_reponse`) VALUES
(2, 2),
(9, 2),
(20, 2),
(23, 2),
(24, 2),
(28, 3),
(5, 4),
(24, 4),
(30, 4),
(20, 5),
(21, 5),
(14, 6),
(16, 6),
(29, 6),
(22, 7),
(25, 7),
(7, 8),
(21, 8),
(24, 8),
(9, 9),
(23, 9),
(27, 9),
(16, 11),
(25, 11),
(26, 13),
(21, 16),
(22, 16),
(19, 19),
(24, 19),
(1, 25),
(8, 25),
(26, 25),
(7, 26),
(16, 26),
(18, 26),
(20, 26),
(21, 26),
(22, 26),
(26, 26),
(3, 27),
(6, 27),
(15, 27),
(16, 27),
(25, 27),
(13, 28),
(14, 28),
(3, 30),
(4, 30),
(20, 30),
(11, 32),
(12, 32),
(10, 33),
(7, 34),
(8, 34);

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

DROP TABLE IF EXISTS `reponse`;
CREATE TABLE IF NOT EXISTS `reponse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `intitule_UNIQUE` (`intitule`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reponse`
--

INSERT INTO `reponse` (`id`, `intitule`) VALUES
(103, 'Adyson Magalhães Maia'),
(119, 'Ahmed Hamdi'),
(4, 'Alain Bouju'),
(14, 'Alain Gaugue'),
(126, 'Anh Thu Phan Ho'),
(10, 'Antoine Doucet'),
(27, 'Armelle Prigent'),
(30, 'Arnaud Revel'),
(121, 'Axel Jean-Caurent'),
(113, 'Bah Hui Tran'),
(109, 'Cécilia Ostertag'),
(9, 'Christophe Demko'),
(127, 'Christophe Rigaud'),
(12, 'Cyril Faucher'),
(38, 'Damien Mondou'),
(102, 'Duc Hung Luong'),
(35, 'El-Hadi Zahzah'),
(36, 'Elhadi Belghache'),
(93, 'Esteban Frossard'),
(1, 'Farid Ammar-Boudjelal'),
(100, 'Florian Lardeux'),
(3, 'Frédéric Bertrand'),
(19, 'Georges Louis'),
(116, 'Hamza Ben Ammar'),
(98, 'Hanen Khlif'),
(40, 'Hicham Slimani'),
(120, 'Hoang Nam Ho'),
(37, 'Ismaël Bennis'),
(24, 'Jacques Morcos'),
(18, 'Jamal Khamlichi'),
(20, 'Jamal Malki'),
(5, 'Jean-Christophe Burie'),
(33, 'Jean-François Viaud'),
(17, 'Jean-Loup Guillaume'),
(26, 'Jean-Marc Ogier'),
(92, 'Jordan Drapeau'),
(114, 'Joris Voerman'),
(104, 'Julien Maitre'),
(128, 'Kais Rouis'),
(2, 'Karell Bertet'),
(87, 'Lady Viviana Beltrán Beltrán'),
(122, 'Louisa Kessi'),
(97, 'Made Windu Antara Kesiman'),
(117, 'Marie Neige Chapel'),
(32, 'Marie-Hélène Verrons Baudoux'),
(95, 'Marwa Hamdi'),
(31, 'Matthieu Robert'),
(22, 'Michel Ménard'),
(8, 'Mickaël Coustaty'),
(15, 'Mohamed Yacine Ghamri-Doudane'),
(106, 'Mohammad Nasiruddin'),
(28, 'Mourad Rabah'),
(34, 'Muriel Visani'),
(124, 'Nhu Khoa Nguyen'),
(125, 'Nhu Van Nguyen'),
(39, 'Nicolas Sidere'),
(112, 'Nicolas Texier'),
(96, 'Noudehouenou Lionel Jaderne Houssou'),
(94, 'Nour Haidar'),
(129, 'Nouredine Tamani'),
(11, 'Pascal Estraillier'),
(29, 'Patrice Raveneau'),
(13, 'Patrick Franco'),
(16, 'Petra Gomez-Krämer'),
(118, 'Quoc Bao Dang'),
(25, 'Rémy Mullot'),
(6, 'Ronan Champagnat'),
(115, 'Sabrine Aroua'),
(88, 'Salah Eddine Boukhetta'),
(89, 'Soraya Chachoua'),
(21, 'Sylvain Marchand'),
(23, 'Sylvain Michelin'),
(101, 'Than Nam Le'),
(107, 'Thanh Khoa Nguyen'),
(108, 'Thi Tuyet Hai Nguyen'),
(91, 'Thierry Deschamps-De-Paillette'),
(110, 'Valentin Owczarek'),
(7, 'Vincent Courboulay'),
(105, 'Vincent Merelle'),
(111, 'Vincent Poulain D\'andecy'),
(90, 'Vinh Loc Cu'),
(99, 'Wafa Khlif'),
(85, 'Zied Aouini'),
(123, 'Zuheng Ming');

-- --------------------------------------------------------

--
-- Structure de la table `score`
--

DROP TABLE IF EXISTS `score`;
CREATE TABLE IF NOT EXISTS `score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `score`
--

INSERT INTO `score` (`id`, `value`) VALUES
(1, 110),
(2, 110),
(3, 10),
(4, 150),
(5, 600),
(6, 635),
(7, 815),
(8, 30),
(9, 565),
(10, 280),
(11, 320),
(12, 110),
(13, 110),
(14, 0),
(15, 0),
(16, 70),
(17, 0),
(18, 0),
(19, 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `id_categorie_fk` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `id_niveau_fk` FOREIGN KEY (`id_niveau`) REFERENCES `niveau` (`id`);

--
-- Contraintes pour la table `question_indice`
--
ALTER TABLE `question_indice`
  ADD CONSTRAINT `question_indice_ibfk_1` FOREIGN KEY (`id_indice`) REFERENCES `indice` (`id`),
  ADD CONSTRAINT `question_indice_ibfk_2` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`);

--
-- Contraintes pour la table `question_reponse`
--
ALTER TABLE `question_reponse`
  ADD CONSTRAINT `id_question_fk` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`),
  ADD CONSTRAINT `id_reponse_fk` FOREIGN KEY (`id_reponse`) REFERENCES `reponse` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
