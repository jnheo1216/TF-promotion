require('dotenv').config();

const mail = require('./mail.js');

const http = require('http');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }
// app.use(cors(corsOptions));

const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'promotion_user_data'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('db Connected!');
});


const users = [
    {
        id: 1,
        name:'허진녕', 
        email:'hjeionyng94@gmail.com', 
        phone: '01025201924'
    },
    {
        id: 2,
        name:'홍길동', 
        email:'hkd@gmail.com', 
        phone: '01012341234'
    },
];

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.get("/api/users", (req, res) => {
    res.json({ok:true, users: users});
});

app.post("/api/users", (req, res) => {
    const {id, name, email, phoneNum} = req.body;
    // 중복 검사 예정
    const isvalid = false;
    let email_data = {
        from: "hjeionyng@naver.com",
        to: email,
        subject: name+"님 이벤트 참여완료!!",
        html: "<p>success!!</p>"
    };
    if (isvalid) {
        mail.send(email_data);
    }

    users.push({id, name, email, phoneNum});
    res.json({ok:true, users: users});

});

app.get("/api/users/name", (req, res) => {
    const userName = req.query.userName;
    const user = users.filter(data => data.name == userName);
    res.json({ok:true, user: user});
});

app.get("/api/users/:userid", (req, res) => {
    const userId = req.params.userid;
    const user = users.filter(data => data.id == userId);
    res.json({ok:true, user: user});
});


const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

//////////////////////////////
