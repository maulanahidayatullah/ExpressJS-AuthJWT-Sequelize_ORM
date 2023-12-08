const AnimeModel = require('../models').Anime;
const Validator = require('fastest-validator');
const v = new Validator();


module.exports = {
    list: async (req, res) => {
        try {
            return AnimeModel
                .findAll()
                .then((anime) =>
                    res.json({
                        status: 200,
                        message: "Success Retrieve Data",
                        data: anime
                    }))
                .catch((error) => {
                    res.json({
                        status: 500,
                        message: "Internal Server Error",
                    })
                });
        } catch (error) {

        }
    },
    create: async (req, res) => {
        try {
            const rule = {
                title: "string",
                content: "string"
            }

            const validate = v.validate(req.body, rule);
            if (validate.length) {
                return res.json({
                    status: 500,
                    message: "Internal Server Error",
                })
            }

            return AnimeModel
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
        } catch (error) {
            res.status(500).send({
                auth: false,
                message: "Error",
                errors: err
            });
        }
    },
}