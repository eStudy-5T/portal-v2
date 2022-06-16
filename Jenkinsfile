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
      when {
        anyOf {
          branch 'dev'
          branch 'ops'
        }
      }
      steps {
        sh 'bash ./scripts/stop.sh'
      }
    }
    stage('Deploying portal') {
      when {
        anyOf {
          branch 'dev'
          branch 'ops'
        }
      }
      steps {
        sh 'bash ./scripts/deploy.sh'
      }
    }
  }
  environment {
    REACT_APP_API_HOST = 'https://api.letmeet.xyz'
  }
}