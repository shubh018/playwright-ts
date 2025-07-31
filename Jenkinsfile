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

        stage('Run Playwright Tests') {
          steps {
            sh 'npx playwright install chromium --with-deps'

            script {
              def result = sh(script: 'npx playwright test --project chromium', returnStatus: true)
              if (result != 0) {
                echo "❌ Some tests failed, but continuing to build reports..."
                currentBuild.result = 'UNSTABLE'
              }
            }
          }
        }

        stage('Build Dashboard UI') {
          steps {
            dir('playwright-dashboard') {
              sh 'npm install'
              sh 'npm run build'
            }
            sh 'ls playwright-dashboard/build'
            sh 'cp -r playwright-dashboard/build/* playwright-dashboard-output/'
            sh 'cp playwright-report/report.json playwright-dashboard-output/'  // Copy the data file
            sh 'ls -la playwright-report'
            sh 'echo "<html><body><h1>Hello from Jenkins</h1></body></html>" > test-output/index.html'
          }
      }
    }

    post {
      always {
        sh 'ls -l playwright-dashboard-output'
        sh 'head -n 10 playwright-dashboard-output/index.html'

        publishHTML([
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright HTML Report'
        ])
        publishHTML([
          reportDir: 'playwright-dashboard-output',
          reportFiles: 'new-index.html',
          reportName: 'Custom Playwright Dashboard'
        ])
        publishHTML([
          reportDir: 'test-output',
          reportFiles: 'index.html',
          reportName: 'Dummy Test HTML'
        ])

      }
    }
}
