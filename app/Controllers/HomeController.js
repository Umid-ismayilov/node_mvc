
const index = (req, res, next) => {
    view( req, res, next,'index.html');
}

const getUsers = (req, res, next) => {
    db.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT id,name,surname,pin from users LIMIT 1', (err, rows) => {
            connection.release(); // return the connection to pool
            if (err) throw err;
            res.json(rows);
        });
    });
}

module.exports = {
    getUsers:getUsers,
    index:index
}

