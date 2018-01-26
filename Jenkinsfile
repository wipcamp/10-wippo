pipeline {
  agent any
  environment {
    GIT_BRANCH = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
  }
  stages {
    stage('initial') {
      steps {
        sh 'yarn install'
      }
    }
    stage('test') {
      steps {
        sh 'echo no test now test trigger'
      }
    }
    stage('build') {
      when {
        expression {
          branch = sh(returnStdout: true, script: 'echo $GIT_BRANCH')
          return branch == 'develop' || branch == 'master'
        }
      }
      steps {
        sh 'sudo docker build . -t wip-wippo'
        sh 'sudo docker tag wip-wippo registry.wip.camp/wip-wippo:$GIT_BRANCH-$BUILD_NUMBER'
        sh 'sudo docker tag wip-wippo registry.wip.camp/wip-wippo'
      }
    }
    stage('push') {
      when {
        expression {
          branch = sh(returnStdout: true, script: 'echo $GIT_BRANCH')
          return branch == 'develop' || branch == 'master'
        }
      }
      steps {
        sh 'sudo docker push registry.wip.camp/wip-wippo:$GIT_BRANCH-$BUILD_NUMBER'
        sh 'sudo docker push registry.wip.camp/wip-wippo'
      }
    }
    stage('clean') {
      when {
        expression {
          branch = sh(returnStdout: true, script: 'echo $GIT_BRANCH')
          return branch == 'develop' || branch == 'master'
        }
      }
      steps {
        sh 'sudo docker image rm registry.wip.camp/wip-wippo:$GIT_BRANCH-$BUILD_NUMBER'
        sh 'sudo docker image rm registry.wip.camp/wip-wippo'
      }
    }
  }
  post {
    success {
      sh 'echo success'
    }
    failure {
      sh 'echo failure'
    }
  }
}