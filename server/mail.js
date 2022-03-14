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

exports.send = async (option) => {
    nodemailer.createTransport(email).sendMail(option, (error, info) => {
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
