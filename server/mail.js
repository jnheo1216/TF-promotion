require('dotenv').config();

const nodemailer = require('nodemailer');
const email ={
    service: "Naver",
    host: "smtp.naver.com",
    port: process.env.MAILPORT,
    auth: {
      user: process.env.MAILID,
      pass: process.env.MAILPASSWORD
    }
}

exports.send = async (to_email, to_name) => {
    let email_data = {
        from: "hjeionyng@naver.com",
        to: to_email,
        subject: to_name+"님 이벤트 참여완료!!",
        html: "<p>success!!</p>"
    };
    nodemailer.createTransport(email).sendMail(email_data, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(info);
            return info.response;
        }
    });
};

// let email_data = {
//     from: "hjeionyng@naver.com",
//     to: "hjeionyng94@gmail.com",
//     subject: "nodemailer 테스트 해보기",
//     html: "<p>success!</p>"
// };

// send(email_data);
