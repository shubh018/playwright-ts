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
            sh 'npx playwright test --project chromium'
          }
        }

        stage('Build Dashboard UI') {
          steps {
            dir('playwright-dashboard') {
              sh 'npm install'
              sh 'npm run build'
              sh 'cp -r build/* ../playwright-dashboard-output/'
              sh 'cp playwright-report/report.json playwright-dashboard-output/'  // Copy the data file
              sh 'ls -la playwright-report'
            }
          }
      }
    }

    post {
      always {
        publishHTML([
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright HTML Report'
        ])
        publishHTML([
          reportDir: 'playwright-dashboard-output',
          reportFiles: 'index.html',
          reportName: 'Custom Playwright Dashboard'
        ])
      }
    }
}
