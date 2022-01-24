const web = require('../router/web')
const api = require('../router/api')
const routers   = (app)=>{
    app.all('*', function(req, res){
        res.status(404).json({
            status: 404,
            message: 'Not Found'
        });
    });
    const API_PREFIX = "/api/";
    app.use('/',web)
    app.use(`${API_PREFIX}`,api)
}

module.exports = routers;