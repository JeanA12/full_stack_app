# full_stack_app

## Introduction

Dans ce projet le but est de mettre en place une application avec un front (Angular) et un back (Springboot), construire les images Docker de ces derniers
et de faire le build et le déploiement avec Jenkins grâce à un pipeline.
On va donc présenter les étapes de construction du projets, puis la méthode pour que quelqu'un puisse déployer le projet en local chez lui.

## Construction du projet (dev)

### Mise en place du back et de l'image Docker

Nous verrons comment nous avons construit le back de notre application. Nous avons choisi de créer celui-ci avec Springboot.
Nous avons utilisé les paramètres suivants:
![Alt text](images/tuto_spring.png.jpg?raw=true "Spring parameters")
On modifie ensuite le fichier pour avoir un début d'API.
Sachant qu'on est sous Linux/ubuntu, on peut tester en tapant la commande :
```mvn spring-boot:run```
Le but étant de faire une image Docker, on écrit un fichier Dockerfile.
Les lignes du Dockerfile font les choses suivantes:
``` FROM openjdk:17-jdk-alpine``` : importe une autre image Docker nécessaire pour le projet.
```COPY target/demo*.jar /app.jar``` : copie le fichier jar localement (du point de vue Docker). 
```ENTRYPOINT [ "java","-jar","/app.jar" ]``` : créer le point d'entrée.
```EXPOSE 8080``` : ouvre le port 8080.
Cela permet ainsi de pouvoir faire une image Docker fonctionnel de notre API.

### Mise en place du front et de l'image Docker

### Mise en place de Jenkins

### Mise en relation Github-Jenkins

## Mise en déploiement