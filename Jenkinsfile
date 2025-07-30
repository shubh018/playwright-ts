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
            sh 'npx playwright install chromium --with-deps'
            sh 'npx playwright test --project chromium --reporter=html'
          }
        }

        stage('Archive Report') {
          steps {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
          }
        }
    }

    post {
      always {
        publishHTML([
          allowMissing: true,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Test Report'
        ])
      }
    }
}
