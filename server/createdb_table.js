// 만들때 처음만 쓰기

require('dotenv').config();

const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'promotion_user_data'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('db Connected!');
    // users => id, name, email, phone
    const sql = 'CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL)';
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log('user table created!!');
    });
});