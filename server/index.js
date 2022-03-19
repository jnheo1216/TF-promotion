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


// const users = [
//     {
//         id: 1,
//         name:'허진녕', 
//         email:'hjeionyng94@gmail.com', 
//         phone: '01025201924'
//     },
//     {
//         id: 2,
//         name:'홍길동', 
//         email:'hkd@gmail.com', 
//         phone: '01012341234'
//     },
// ];

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.get("/api/users", (req, res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ok:true, users: result});
    });
});

app.post("/api/users", (req, res) => {
    const {name, email, phone} = req.body;

    const sql = 'SELECT id FROM users WHERE phone=?';
    con.query(sql, [phone], (err, result, fields) => {
        if (result[0] == undefined) {
            // 중복자 없음
            console.log('없');
            const sql2 = 'INSERT INTO users(name, email, phone) VALUES(?, ?, ?)';
            con.query(sql2, [name, email, phone], (err, result, fields) => {
                if (err) throw err;
                console.log(result);
            });
            mail.send(email, name);
            res.json({ok:true, message: '이벤트 참여 완료'});
        }
        else {
            // 중복자 있음
            console.log('있');
            res.json({ok:false, message: '이미 참여한 유저입니다'});
        }
    });
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
