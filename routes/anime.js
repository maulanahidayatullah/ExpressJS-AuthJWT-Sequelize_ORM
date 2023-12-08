var express = require('express');
var router = express.Router();
const AnimeController = require("../controllers/AnimeController");
const middleware = require("../middleware/authJWT");

router.get("/", (req, res, next) => middleware.auth(req, res, next), AnimeController.list);
router.post("/create", (req, res, next) => middleware.auth(req, res, next), AnimeController.create);

// router.post('/', (req, res, next) => middleware.authorizations(req, res, next) {

module.exports = router;
