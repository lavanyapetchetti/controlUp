pipeline {
    agent any

    tools {
        nodejs 'Node_23'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Review Node and npm Installations') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('ControlUp') {
                    sh 'npm install'
                }
            }
        }

        stage('Run API Tests') {
            steps {
                script {
                    try {
                        dir('ControlUp') {
                            // Run tests
                            sh 'npm test'
                        }
                    } catch (Exception e) {
                        // Handle the exception
                        echo "API tests failed with error: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        error("Failing the build due to test failure.")
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up or notify as needed
            echo 'Build completed. Check archived artifacts for logs and test results.'
        }
        success {
            echo 'API tests ran successfully!'
        }
        failure {
            echo 'API tests failed.'
        }
    }
}