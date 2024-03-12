# full_stack_app

## Introduction

Dans ce projet le but est de mettre en place une application avec un front (Angular) et un back (Springboot), construire les images Docker de ces derniers
et de faire le build et le déploiement avec Jenkins grâce à un pipeline.

On va donc présenter les étapes de construction du projets, puis la méthode pour que quelqu'un puisse déployer le projet en local chez lui.

## Construction du projet (dev)

### Mise en place du back et de l'image Docker

Nous verrons comment nous avons construit le back de notre application. Nous avons choisi de créer celui-ci avec Springboot.
Nous avons utilisé les paramètres suivants:

![Alt text](images/tuto_spring.png?raw=true "Spring parameters")

On modifie ensuite le fichier pour avoir un début d'API.
Sachant qu'on est sous Linux/ubuntu, on peut tester en tapant la commande :

```mvn spring-boot:run```

Le but étant de faire une image Docker, on écrit un fichier Dockerfile.
Les lignes du Dockerfile font les choses suivantes:

- ``` FROM openjdk:17-jdk-alpine``` : importe une autre image Docker nécessaire pour le projet.

- ```COPY target/demo*.jar /app.jar``` : copie le fichier jar localement (du point de vue Docker). 

- ```ENTRYPOINT [ "java","-jar","/app.jar" ]``` : créer le point d'entrée.

- ```EXPOSE 8080``` : ouvre le port 8080.

Cela permet ainsi de pouvoir faire une image Docker fonctionnel de notre API.

### Mise en place du front et de l'image Docker

Pour le front, on utilise Angular Js. Après l'avoir installé. on peut faire la commande suivante:

```ng new client-demo-test --no-standalone```

Cette-dernière permet de créer un projet avec un fichier `app.module.ts`. Cela nous permet d'utiliser ClientHTTPModule.
Ensuite, on créer un service qui va requêter notre back, avec la commande:

```ng g s services```.

on peut ainsi programmer nos requêtes et les afficher dans notre page html.
Finalement, on peut tester notre front avec la commande:

```ng serve```

Maintenant qu'on a vérifier que notre application fonctionne, on peut créer notre Dockerfile.
On a donc les lignes avec les explications correspondantes:
- ```FROM node:lts-alpine AS builder``` : importe une autre image docker avec un alias.
- ```WORKDIR /app``` : défini l'espace de travail du docker.
- ```COPY . .``` : copie le répertoire dans l'espace de travail.
- ```ENV NODE_OPTIONS=--openssl-legacy-provider``` : met en place une option pour l'environnement de travail.
- ```RUN npm install``` : permet à l'environnement d'installer les packages pour faire tourner notre application
- ```RUN npm run build``` : construit le projet.

La suite des commandes sont redondantes donc on n'expliquera pas ce qu'elles font.
On aura ainsi l'image Docker propre permettant d'avoir une page qui requête notre back et une api tierce.

<a name="jenkins"></a>

### Mise en place de Jenkins

Dans cette partie nous verrons comment nous avons mis en place jenkins.
Après l'installation, On télécharge le plugin Node.js. Puis dans le gestionnaires de tools, On créer une version Node.JS qui s'installe automatiquement, qui s'appelle ```nodejs_latest``` et qui a une version supérieur à 18.5.1. On le voit dans l'image suivante :

![Alt text](images/tuto_jenkins.png?raw=true "Jenkins NodeJs parameters")

Ensuite on télécharge le plugins Docker. Pour autoriser Jenkins à utiliser les commandes docker, on doit lui donner les droits de groupe en faisant:

```sudo usermod -aG docker jenkins```

Ensuite on redémarre Jenkins avec la commande : `sudo systemctl restart docker`

Et on créer le pipeline avec Github avec la méthode décrit dans la partie suivante.

<a name="relations"></a>

### Mise en relation Github-Jenkins

On créer le pipeline en mettant les informations du Github dans Jenkins, puis on créer un `Jenkinsfile` dans le repository Github et on push.
Une fois le fichier push, On peut l'éditer pour pouvoir build le projet dans Jenkins.
On a donc les lignes suivantes du fichier :
- ```agent any``` : car on a besoin d'aucun agent
- ```environment {NODEJS_HOME = tool 'nodejs_latest' , PATH="${env.NODEJS_HOME}/bin:${env.PATH}"}``` : pour la mise en place de la version de NodeJS 
- ```stage('Build Frontend')``` : Les étapes de build du front de l'application.
- ```docker.build('nom_image_frontend:latest', 'client-demo-test')``` : cela permet la création de l'image Docker
- ```sh 'docker run -d -p 1414:80 nom_image_frontend:latest'``` : met en route les images docker nécessaire à l'application

On peut ainsi push le fichier et lancer le build dans Jenkins. On va ensuite sur l'url : `http://localhost:1414/` et on voit que l'application fonctionne :

![Alt text](images/tuto_app.png?raw=true "Amazing Application")

## Mise en déploiement

Pour la mise en déploiement, On fait les étapes [Mise en place jenkins](#jenkins) et [Mise en relation Github-Jenkins](#relations)

