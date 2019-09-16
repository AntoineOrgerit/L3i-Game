# Projet ubiquitaire
### Lisa Fougeron et Antoine Orgerit

## Prérequis
1. Cordova et/ou PhoneGap
2. Git
3. Node.js et le gestionnaire de paquets npm
4. Un serveur de base de données MySQL
5. PHP version 5.4 minimum

## Lancement
1. Récupérer le projet sur Git
2. Installer les dépendances nécessaires avec la commandes ```npm i```
3. Lancer un serveur MySQL et peupler la base de données à l'aide du script disponible dans le sous-dossier Ressources
4. Dans un invité de commandes, se placer dans le sous-dossier Server et lancer la commande ``` php -S [ip]:[port] ``` en spécifiant l'IP et le port à utilisé par le serveur PHP *(attention : le choix de l'IP est importante pour que l'application ait accès au serveur)*
5. Dans un second invité de commandes, se placer dans le sous-dossier QuizzApp et lancer la commande ```phonegap serve``` ou effectuer une compilation et un déploiement sur la plateforme souhaitée pour utiliser l'application

TODO : ajouter la spécification des ports lors du launch (PHP: serveur MySQL, App: serveur PHP)

