/* 여러 라우팅에서 사용하기 위해 별도의 페이지에서 mysql 연결 */

const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'roman',
  password : 'roman',
  database : 'romantrip',
  dateStrings : "date"
});

db.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }else console.log('MySQL is Connected!!');
});


module.exports = db;