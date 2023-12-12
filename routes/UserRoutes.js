var express = require('express');
var router = express.Router();
const UserController = require("../controllers/UserController.js");
const middleware = require("../middleware/authJWT.js");

/* GET users listing. */
router.post("/register", UserController.signup);
router.post("/login", UserController.signin);

module.exports = router;
