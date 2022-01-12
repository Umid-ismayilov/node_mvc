const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: "173.212.224.244",
//     user: "newuser",
//     password: "P4ss3v1l@l1mklM@K",
//     database : 'limak_db',
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