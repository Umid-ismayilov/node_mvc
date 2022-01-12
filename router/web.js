var express = require('express')
var router  = express.Router()
var HomeController = require('../app/Controllers/HomeController')


router.get("/",HomeController.index);
router.get("/users",HomeController.getUsers);

module.exports = router;