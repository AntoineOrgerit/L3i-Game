# Projet ubiquitaire
### Lisa Fougeron et Antoine Orgerit

## Prérequis
1. Cordova et/ou PhoneGap en CLI
2. Git
3. Node.js et le gestionnaire de paquets npm
4. Un serveur de base de données MySQL
5. PHP version 5.4 minimum

## Lancement
1. Récupérer le projet sur Git par le biais de la commande suivante :
```
git clone https://gitlab.univ-lr.fr/lfougero/phonegapgame.git
```
2. Installer les dépendances nécessaires avec la commande ```npm i```
3. Ajouter les plateformes nécessaires en fonction des besoins à l'aide de la commande ``` cordova platform add [platform-name] ```
5. Lancer un serveur MySQL et peupler la base de données à l'aide du script disponible dans le sous-dossier Ressources
6. Si besoin, modifier l'adresse IP et le port de connexion à la base de données dans le fichier *server.ini* du serveur PHP.
7. Dans un invité de commandes, lancer la commande ``` php -S [ip]:[port] ``` en spécifiant l'IP et le port à utilisé par le serveur PHP. Un mini-serveur PHP sera alors démarré.
*Attention : Le choix de l'IP est importante pour que l'application ait accès au serveur.
Dans certains cas, l'adresse IP spécifiée n'est pas accessible depuis l'application. Une solution temporaire est de lancer le serveur à l'adresse 0.0.0.0, qui ouvre l'accès du mini-serveur sur l'ensemble des adresses réseaux de la machine.*
8. Si besoin, modifier l'adresse IP et le port de connexion au serveur dans le fichier *www/js/config.js* de l'application.
8. Dans un second invité de commandes, se placer dans le sous-dossier QuizzApp et lancer la commande ```phonegap serve``` ou effectuer une compilation et un déploiement sur la plateforme souhaitée pour utiliser l'application.