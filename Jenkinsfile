pipeline {
  agent any
  stages {
    stage('Checking dependencies') {
      steps {
        sh 'bash ./scripts/dependencies.sh'
      }
    }
    stage('Building portal') {
      steps {
        sh 'bash ./scripts/build.sh'
      }
    }
    stage('Stopping old version') {
      // when {
      //   branch 'main'
      // }
      steps {
        sh 'bash ./scripts/stop.sh'
      }
    }
    stage('Deploying portal') {
      // when {
      //   branch 'main'
      // }
      steps {
        sh 'bash ./scripts/deploy.sh'
      }
    }
  }
  environment {
    REACT_APP_API_HOST = 'https://api.letmeet.xyz'
  }
}