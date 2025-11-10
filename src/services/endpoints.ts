

const endpoints = {

    login: 'api/auth/login',
    register: 'api/auth/register',
    sendEmailOtp: 'api/auth/send-email-otp',
    verifyEmailOtp: "api/auth/verify-email-otp",
    sendMobileOtp: "api/auth/send-mobile-otp",
    verifyMobileOtp: "api/auth/verify-mobile-otp",
    Syllabus: 'api/syllabus/upload',
    uploadPQP: 'api/pqp/pqpupload',
    uploadAnswer: 'api/answerkey/uploadbyAnswer',
    uploadResult: 'api/result/Resultupload',
    uploadCutoff: 'api/cutoff/upload',
    createJobpost: 'jobpost/create',
    adminCard: 'api/admit-card/generate-by-job?jobPostId=',

    // 
    createQuestionpapers:'api/question-paper/create?jobPostId=1'


}

export default endpoints