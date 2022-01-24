var app     = require('express')();
var http    = require('http').createServer(app);
require('./services/socket').connection(http)
require('./services/app')();
require('./services/routers')(app);

const bodyParser = require('body-parser')
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const PORT  = process.env.PORT || 5000

http .listen(PORT,()=>{
        console.log("Server Running"+' '+PORT);
})
