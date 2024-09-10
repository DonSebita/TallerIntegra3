const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  database: 'pureba_1',
  user: 'root',
  password: ''
});