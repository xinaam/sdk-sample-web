node {
  
  checkout scm
  def imgVersion = "v2-${currentBuild.number}"
  def dockerfile = "jenkins-script-stage/joint-journey-v2.Dockerfile"
  def dockerImage = "mukulxinaam/joint-journey:${imgVersion}"
  def Namespace = "default"
  def PushToregistry = false

    stage('Clean workspace') {
      echo "Clean Workspace::"
    }
  
  if (params.PushToregistry == 'No'){
    stage('Build docker image') {
     sh "docker build -t ${dockerImage} -f ${dockerfile} ."
    }
  }
  
 if (params.PushToregistry == 'Yes'){
    stage('Build docker image') {
      sh "docker build -t ${dockerImage} -f ${dockerfile} ."
    }
    stage('Push docker image') {

       withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'dockerhub-mukul', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]){
             sh 'docker login -u $USERNAME -p $PASSWORD'
        }
            sh "docker push ${dockerImage}"
    }
  }
stage('Mail Send Conformation') {
    mail (to: 'surendra@xfinite.io',
        subject: "Xfinite-joint-journeyV2 Job '${env.JOB_NAME}' (${env.BUILD_NUMBER})",
        body: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]")
  }
}
