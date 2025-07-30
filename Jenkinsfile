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
            sh 'npx playwright install --with-deps'
            sh 'npx playwright test webkit --project chromium'
          }
        }
    }
}
