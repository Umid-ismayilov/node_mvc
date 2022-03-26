const web = require('../router/web')
const api = require('../router/api')
const routers   = (app)=>{
    const allowedOrigins = ["http://localhost:5000"];

    app.use(function (req, res, next) {
        let origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        console.log(res);
        // Pass to next layer of middleware
        next();
    });
    const API_PREFIX = "/api/";
    app.use('/',web)
    app.use(`${API_PREFIX}`,api)
    app.all('*', function(req, res){
        res.status(404).json({
            status: 404,
            message: 'Not Found'
        });
    });
}

module.exports = routers;