// 만들때 처음만 쓰기

require('dotenv').config();

const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD
});

con.connect(function(err) {
    if (err) throw err;
    console.log('db Connected!');
    // promotion_user_data
    con.query('CREATE DATABASE promotion_user_data', (err, result) => {
        if (err) throw err;
        console.log('database created!!');
    });
});