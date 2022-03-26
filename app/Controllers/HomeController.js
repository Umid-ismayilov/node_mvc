const excelToJson = require('convert-excel-to-json');


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

const importImport = (req, res, next)=>{
    const {method,body,file} =req;
    if (method === 'POST') {
        if (file) {
            const result = excelToJson({
                sourceFile: file.path
            });
            var datas = result['TURKISH'];
            var newData = [];
            var kq = datas[0];
            datas.map((data, index) => {
                if (data.A !== 'KG') {
                    var zona_id = data.A;
                    delete data.A;
                    var i = 1;
                    from_weight = 0;
                    for (const d in data) {
                        if (d !== 'A') {
                            newData.push({
                                country_id: 1,
                                zona_id: zona_id,
                                from_weight: from_weight,
                                to_weight: kq[d],
                                price: data[d],
                                region_id: 0,
                                created_at: new Date(),
                                type: 1
                            })
                        }
                        i++;
                        from_weight = kq[d];
                    }


                }
            })

            db.getConnection((err, connection) => {
                if (err) throw err;
                console.log('connected as id ' + connection.threadId);
                var values = newData.map(data => Object.values(data))
                var sql = "INSERT INTO country_tariffs (country_id, zona_id,from_weight,to_weight,price,region_id,created_at,type) VALUES ?";
                connection.query(sql, [values], (err, rows) => {
                    connection.release(); // return the connection to pool
                    if (err) throw err;
                    // res.json(rows);
                });
            });
            res.json(newData);
        } else {
            res.render('index', {name: body});
        }
    } else {
        res.render('index', {name: 'John'});

    }

}

module.exports = {
    getUsers:getUsers,
    index:index,
    importImport:importImport
}

