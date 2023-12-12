var express = require('express');
var router = express.Router();
const KategoriController = require("../controllers/KategoriController");
const middleware = require("../middleware/authJWT");

router.get("/", (req, res, next) => middleware.auth(req, res, next), KategoriController.list);
router.get("/:id", (req, res, next) => middleware.auth(req, res, next), KategoriController.getById);
router.post("/create", (req, res, next) => middleware.auth(req, res, next), KategoriController.create);
router.put("/update/:id", (req, res, next) => middleware.auth(req, res, next), KategoriController.update);
// router.delete("/delete/:id", (req, res, next) => middleware.auth(req, res, next), KategoriController.delete);

module.exports = router;