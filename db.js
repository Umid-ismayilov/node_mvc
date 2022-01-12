const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user:  process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database : process.env.DB_DATABASE,,
//     port : 3306,
// });
//
// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL Server!');
// });


const db = mysql.createPool({
    connectionLimit : 100,
    host:       process.env.DB_HOST,
    user:       process.env.DB_USERNAME,
    password:   process.env.DB_PASSWORD,
    database :  process.env.DB_DATABASE,
    debug    :  process.env.LISTEN_PORT
});


module.exports=db