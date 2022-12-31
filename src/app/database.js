import mysql2 from "mysql2"
import { envVar } from './config.js';

const connections = mysql2.createPool({
  host: envVar.MYSQL_HOST,
  port: envVar.MYSQL_PORT,
  database: envVar.MYSQL_DATABASE,
  user: envVar.MYSQL_USER,
  password: envVar.MYSQL_PASSWORD
})


connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log('连接失败', err);
    } else {
      console.log('数据库连接成功~');
    }
  })
})

export const connection = connections.promise()
