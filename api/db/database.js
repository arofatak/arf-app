const mysql = require('mysql');

// konfigurasi koneksi
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pdi'
});

//connect ke database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected!');
});

module.exports = conn;