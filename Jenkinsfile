pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'Echo "devops testing"'
      }
    }

  }
  environment {
    REACT_APP_API_HOST = 'https://api.letmeet.xyz'
  }
}