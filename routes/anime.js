var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');
const v = new Validator();

const Anime = require('../models').Anime;
// const Op = db.Sequelize.Op;

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send(process.env.APP_NAME);
// });

router.post('/', (req, res, next) => middleware.authorizations(req, res, next) {

    const rule = {
        title: "string",
        content: "string"
    }

    const validate = v.validate(req.body, rule);
    if(validate.length) {
    return res.json({
        status: 500,
        message: "Internal Server Error",
    })
}

return Anime
    .create({
        title: req.body.title,
        content: req.body.content,
    })
    .then((anime) => res.json({
        status: 200,
        message: "Created Successfully",
        data: anime
    }))
    .catch((error) => res.json({
        status: 500,
        message: "Internal Server Error",
    }));

});

module.exports = router;
