var express = require('express');
var router = express.Router();
const KategoriController = require("../controllers/KategoriController");
const middleware = require("../middleware/authJWT");

router.get("/", (req, res, next) => middleware.auth(req, res, next), KategoriController.list);

module.exports = router;