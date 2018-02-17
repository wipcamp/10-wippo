pipeline {
  agent any
  environment {
    GIT_BRANCH = "${BRANCH_NAME}"
  }
  stages {
    stage('install-dependencies') {
      steps {
        sh 'sudo docker container run --rm -v $(pwd):/app node:8 sh -c "cd /app && yarn install"'
      }
    }
    stage('build-image') {
      steps {
        sh 'sudo docker build . -t 10-wippo'
        sh 'sudo docker tag 10-wippo registry.wip.camp/10-wippo:$GIT_BRANCH'
        sh 'sudo docker tag 10-wippo registry.wip.camp/10-wippo'
      }
    }
    stage('push-image') {
      steps {
        sh 'sudo docker push registry.wip.camp/10-wippo:$GIT_BRANCH'
        sh 'sudo docker push registry.wip.camp/10-wippo'
      }
    }
    stage('versioning') {
      when {
        expression {
          return GIT_BRANCH == 'master'
        }
      }
      steps {
        sh 'sudo docker tag 10-wippo registry.wip.camp/10-wippo:$GIT_BRANCH-$BUILD_NUMBER'
        sh 'sudo docker push registry.wip.camp/10-wippo:$GIT_BRANCH-$BUILD_NUMBER'        
        sh 'sudo docker image rm registry.wip.camp/10-wippo:$GIT_BRANCH-$BUILD_NUMBER'        
      }
    }
    stage('clean') {
      when {
        expression {
          branch = sh(returnStdout: true, script: 'echo $GIT_BRANCH').trim()
          return branch == 'develop'
        }
      }
      steps {
        sh 'sudo docker image rm registry.wip.camp/10-wippo:$GIT_BRANCH'
        sh 'sudo docker image rm registry.wip.camp/10-wippo'
        sh 'sudo docker image rm 10-wippo'
      }
    }
    stage('deploy-development') {
      when {
        expression {
          return GIT_BRANCH == 'develop'
        }
      }
      steps {
        sh 'sudo kubectl rolling-update wip-wippo -n development --image registry.wip.camp/10-wippo:$GIT_BRANCH --image-pull-policy Always'
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