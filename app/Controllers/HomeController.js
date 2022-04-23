const excelToJson = require('convert-excel-to-json');
const puppeteer = require('puppeteer');
/** elastic connection  **/
const client = require('../../connection')

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

const importElastic =  async (req, res, next) => {
    db.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * from bxb_cities', async (err, rows) => {
            connection.release(); // return the connection to pool
            if (err) throw err;
            var datas =  rows.map(async (item)=>{
                const result =  await  client.index({
                    index: 'bxb_cities',
                    document: item,
                })
              return result;
            })
            res.json(datas);
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

            // db.getConnection((err, connection) => {
            //     if (err) throw err;
            //     console.log('connected as id ' + connection.threadId);
            //     var values = newData.map(data => Object.values(data))
            //     var sql = "INSERT INTO country_tariffs (country_id, zona_id,from_weight,to_weight,price,region_id,created_at,type) VALUES ?";
            //     connection.query(sql, [values], (err, rows) => {
            //         connection.release(); // return the connection to pool
            //         if (err) throw err;
            //         // res.json(rows);
            //     });
            // });
            res.json(newData);
        } else {
            res.render('index', {name: body});
        }
    } else {
        res.render('index', {name: 'John'});

    }

}

/** github login bot  **/
const bot = (req,res,next)=>{


    (async () => {
        const browser = await puppeteer.launch({ headless: false,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            args: ['--user-data-dir'],
            userDataDir: 'C:\\Users\\User\\Desktop\\Chrome',
        })
        const page = await browser.newPage()
        await page.goto('https://github.com/login')
        await page.type('#login_field', process.env.GITHUB_USER)
        await page.type('#password', process.env.GITHUB_PWD)
        await page.click('[name="commit"]')
        await page.waitForNavigation()
        await page.screenshot({ path: screenshot })
        browser.close()
        console.log('See screenshot: ' + screenshot)
    })()
}

/** elastic ping  **/
const  ping = async (req,res,next)=>{
    const result = await client.ping((error) => {
        if (error) {
            console.trace('elasticsearch cluster is down!');
        } console.log('All is well');
    });
    res.json(result);
}

/** elastic getAll  **/
const  getAll = async (req,res,next)=>{
    const result= await client.search({

        index: 'bxb_cities',
        // size: 2, //limit
        query: {
            match_all: {}
        }
    })

    res.json(result.hits.hits);

}

/** elastic getAllCount  **/
const  getAllCount = async (req,res,next)=>{
    const result= await client.count({

        index: 'bxb_cities',
        body: {
            query: {
                match_all: {}
            }
        }
    })

    res.json(result);

}

/** elastic insert  **/
const  insert = async (req,res,next)=>{
   const result =  await client.index({
        index: 'bxb_countries',
        document: {
            name: 'Umid',
            surname: 'Ismayilov'
        },

    })
    res.json(result);
}

/** elastic bulkInsert  **/
const  bulkInsert = async (req,res,next)=>{
    const result = await client.bulk({
             body: [
                 {
                     index: {
                         _index: 'bxb_countries',
                         _id: '1'
                     }
                 },
                 {
                     name: 'Umid',
                     surname: 'Ismayilov',
                 },
                 {
                     create: {
                         _index: 'bxb_countries',
                         _id: '2'
                     }
                 },
                 {
                     name: 'Oktay',
                     surname: 'Huseynov',
                 }
             ]
         })
    res.json(result);
}

/** elastic search  **/
const  search = async (req,res,next)=>{

    const result= await client.search({
        index: 'bxb_cities',
        query: {
            match: { NameEng: req.query.name }
        }
    })
   return  res.json(result);
}

/** elastic truncate  **/
const  truncate  = async (req,res,next)=>{
    const result = await client.deleteByQuery({
        index: 'bxb_cities',
        query: {
            match_all: {}
        }
    })
    res.json(result);
}

/** elastic destroy  **/
const  destroy  = async (req,res,next)=>{
    const result = await client.deleteByQuery({
        index: 'bxb_countries',
        query: {
           match: { name: req.name }
        }
    })
    res.json(result);
}

module.exports = {
    getUsers:getUsers,
    index:index,
    importImport:importImport,
    bot:bot,
    getAll:getAll,
    ping:ping,
    importElastic:importElastic,
    truncate:truncate,
    getAllCount:getAllCount,
    search:search
}

