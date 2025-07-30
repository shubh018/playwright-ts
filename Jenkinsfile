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

        // stage('Install System Dependencies') {
        //   steps {
        //     // Assuming an Ubuntu/Debian-based Jenkins agent
        //     sh 'apt update'
        //     sh 'apt install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libatspi2.0-0 libxcomposite1 libxdamage1 libxkbcommon0 libgbm-dev' // Add other deps as needed
        //   }
        // }

        stage('Install Dependencies'){
          steps {
            sh 'npm install'
          }
        }

        stage('Run Playwright Tests'){
          steps {
            sh 'npx playwright install chromium --with-deps'
            sh 'npx playwright test webkit --project chromium'
          }
        }
    }
}
