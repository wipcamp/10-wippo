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
    stage('build-application') {
      steps {
        sh 'sudo rm -rf .next'
        sh 'sudo docker container run --rm -v $(pwd):/app node:8 sh -c "cd /app && yarn build"'
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
      steps {
        sh 'sudo docker image rm registry.wip.camp/10-wippo:$GIT_BRANCH'
        sh 'sudo docker image rm registry.wip.camp/10-wippo'
        sh 'sudo docker image rm 10-wippo'
      }
    }
    stage('deploy') {
      steps {
        script {
          if (GIT_BRANCH == 'master') {
            sh 'sudo kubectl rolling-update wip-wippo -n production --image registry.wip.camp/10-wippo:master-$BUILD_NUMBER --image-pull-policy Always'
          } else {
            sh 'sudo kubectl rolling-update wip-wippo -n development --image rregistry.wip.camp/10-wippo:develop --image-pull-policy Always'
          }
        }
      }
    }
  }
  post {
    success {
      slackSend(color: good, message: "${env.JOB_NAME} on ${env.GIT_BRANCH} at build number ${env.BUILD_NUMBER} was built successfully & deploy. More infomation ${env.BUILD_URL}")
    }
    failure {
      slackSend(color: danger, message: "${env.JOB_NAME} on ${env.GIT_BRANCH} was fail ${env.BUILD_URL}")
    }
  }
}