// db.js
const config = require("../config");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost", // 数据库主机名
  user: config.user, // 数据库用户名
  password: config.password, // 数据库密码
  database: config.database, // 数据库名
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
