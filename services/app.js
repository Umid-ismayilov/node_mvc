
const app = () => {
    const dotenv = require('dotenv').config();
    global.view = require('../helpers').view;
    global.db = require('../db')
}

module.exports = app;