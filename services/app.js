const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = (app) => {
    const dotenv = require('dotenv').config();
    global.view = require('../helpers').view;
    global.db = require('../db');
    const bodyParser = require('body-parser')
    var cors = require('cors')
    app.use(cors());
    const path = require('path');
    app.options("*", cors());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.set('views', path.basename('/views'));
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine());


}

module.exports = app;