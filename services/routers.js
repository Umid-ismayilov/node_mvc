const web = require('../router/web')
const api = require('../router/api')
const routers   = (app)=>{
    const API_PREFIX = "/api/";
    app.use('/',web)
    app.use(`${API_PREFIX}`,api)
}

module.exports = routers;