var express = require('express')
var router  = express.Router()
var HomeController = require('../app/Controllers/HomeController')
var metaController = require('../app/Controllers/TitleImageController')


router.get("/",HomeController.index);
router.get("/users",HomeController.getUsers);
router.post("/extract",metaController.callback3);

module.exports = router;