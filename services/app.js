const cors = require("cors");
const bodyParser = require("body-parser");

const app = (app) => {
    const dotenv = require('dotenv').config();
    global.view = require('../helpers').view;
    global.db = require('../db')
    const bodyParser = require('body-parser')
    var cors = require('cors')
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
}

module.exports = app;