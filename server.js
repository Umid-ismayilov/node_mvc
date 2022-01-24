var app     = require('express')();
var http    = require('http').createServer(app);
require('./services/socket').connection(http)
require('./services/app')(app);
require('./services/routers')(app);

const PORT  = process.env.PORT || 5000

http .listen(PORT,()=>{
        console.log("Server Running"+' '+PORT);
})
