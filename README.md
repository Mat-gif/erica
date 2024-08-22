# Contexte

Votre mission consiste à développer une application web pour visualiser la trajectoire d'un cyclone sur une carte interactive. L'application devra permettre à l'utilisateur de manipuler une date via un contrôle externe pour mettre à jour dynamiquement la position du cyclone sur la carte.

## Procédure

1. Clonez le répertoire :
    ```bash
    git clone https://github.com/Mat-gif/erica.git
    ```
2. Construisez le conteneur :
    ```bash
    sudo docker-compose up --build
    ```
3. Accédez au site à l'adresse suivante :
    [http://localhost:8080/](http://localhost:8080/)

## Technologies Utilisées

- **Docker Compose** pour la containerisation du projet
- **Vue.js** avec **TypeScript** comme framework
- **OpenLayers** pour la cartographie
- **Bootstrap** pour le responsive design

## Analyse

- Afficher une carte centrée sur le Pacifique Sud-Est
- Afficher la trajectoire complète du cyclone
- Afficher un point dynamique pour représenter la position actuelle du cyclone
- Utiliser un slider pour permettre à l'utilisateur de déplacer dans le temps la position du point dynamique
- Utiliser un dropdown pour afficher des informations complémentaires telles que la vitesse du vent et la pression atmosphérique

## Temps Consacré

9 heures

## Aperçu de l'Application

![Aperçu de l'application](chemin/vers/p.png)
