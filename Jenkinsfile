pipeline {
    agent any

    stages {
        stage('Init') {
            steps {
                echo 'This is from Jenkinsfile in Git'
            }
        }

        stage('Checkout code'){
          steps {
            git branch: 'main',
            url: 'https://github.com/shubh018/playwright-ts.git'
          }
        }

        stage('Install Dependencies'){
          steps {
            sh 'npm install'
          }
        }

        stage('Run Playwright Tests'){
          steps {
            sh 'npx playwright install'
            sh 'npx playwright test webkit --project chromium'
          }
        }
    }

    post {
      failure {
        mail to: 'lixoyim132@7tul.com',
        subject: 'Pipeline Failed',
        body: 'The pipeline failed with an unexpected error.'
      }
    }
}
