var express = require('express')
var router  = express.Router()
var HomeController = require('../app/Controllers/HomeController')
var metaController = require('../app/Controllers/TitleImageController')
const uploadService = require('../services/upload')

router.get("/",HomeController.index);
router.get("/importImport",HomeController.importImport);
router.post("/importImport",uploadService.upload.single('file'),HomeController.importImport);
router.get("/users",HomeController.getUsers);
router.post("/extract",metaController.callback3);

module.exports = router;