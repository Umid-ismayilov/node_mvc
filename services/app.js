const cors = require("cors");
const bodyParser = require("body-parser");

const app = (req, res) => {
    const dotenv = require('dotenv').config();
    global.view = require('../helpers').view;
    global.db = require('../db')
    const bodyParser = require('body-parser')
    var cors = require('cors')
    req.app.use(cors())
    req.app.use(bodyParser.json())
    req.app.use(bodyParser.urlencoded({extended: true}))
}

module.exports = app;