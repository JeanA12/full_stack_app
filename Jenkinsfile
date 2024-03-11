pipeline {
    agent any
    stages {
       /*stage('Build Frontend') {
            steps {
                // Construction de l'application Angular
                dir('client-demo-test') {
                    script {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }*/
        
        stage('Build Backend') {
            steps {
                // Construction de l'application Spring Boot
                dir('demo') {
                    script {
                        sh 'mvn clean package'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                // Construction des images Docker
                script {
                    docker.build('nom_image_frontend:latest', 'client-demo-test')
                    docker.build('nom_image_backend:latest', 'demo')
                }
            }
        }

        stage('Deploy') {
            steps {
                // Déploiement des images Docker
                script {
                    sh 'docker run -d -p 4200:80 nom_image_frontend:latest' // Exemple pour le front-end
                    sh 'docker run -d -p 8080:8080 nom_image_backend:latest' // Exemple pour le back-end
                }
            }
        }
    }
}
