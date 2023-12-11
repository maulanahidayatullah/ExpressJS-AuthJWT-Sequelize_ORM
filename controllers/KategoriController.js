const Validator = require('fastest-validator');
const v = new Validator();
const { KategoriModel } = require('../models');
const { AnimeModel } = require('../models');


module.exports = {
    list: async (req, res) => {
        try {
            return KategoriModel
                .findAll({
                    include: [{
                        model: AnimeModel,
                        as: 'anime'
                    }],
                })
                .then((kategoris) => {
                    let data = kategoris.map((kategori) => ({
                        kategori: kategori.nama,
                        anime: kategori.anime.map((anime) => ({
                            title: anime.title,
                            content: anime.content
                        }))
                    }));

                    res.json({
                        status: 200,
                        message: "Success Retrieve Data",
                        data: data
                    });

                })
                .catch((error) => {
                    console.log(error);
                    res.json({
                        status: 500,
                        message: "Internal Server Error",
                    })
                });
        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },
    // create: async (req, res) => {
    //     try {
    //         const rule = {
    //             title: "string",
    //             content: "string"
    //         }

    //         const validate = v.validate(req.body, rule);
    //         if (validate.length) {
    //             return res.json({
    //                 status: 500,
    //                 message: "Internal Server Error",
    //             })
    //         }

    //         return AnimeModel
    //             .create({
    //                 title: req.body.title,
    //                 content: req.body.content,
    //             })
    //             .then((anime) => res.json({
    //                 status: 200,
    //                 message: "Created Successfully",
    //                 data: anime
    //             }))
    //             .catch((error) => res.json({
    //                 status: 500,
    //                 message: "Internal Server Error",
    //             }));
    //     } catch (error) {
    //         return res.json({
    //             status: 500,
    //             message: "Internal Server Error",
    //         });
    //     }
    // },

    // getById: async (req, res) => {
    //     return AnimeModel
    //         .findByPk(req.params.id, {
    //             // include: [{
    //             //     model: Computer,
    //             //     as: 'computer'
    //             // }],
    //         })
    //         .then((anime) => {
    //             if (!anime) {
    //                 return res.status(400).json({ message: "Anime Not Found !", statuscode: 400 });
    //             }
    //             return res.json({
    //                 status: 200,
    //                 message: "Anime Found !",
    //                 data: anime
    //             });
    //         })
    //         .catch((error) => res.json({
    //             status: 500,
    //             message: "Internal Server Error",
    //         }));
    // },
    // update: async (req, res) => {
    //     try {
    //         return AnimeModel
    //             .findByPk(req.params.id)
    //             .then(anime => {
    //                 if (!anime) {
    //                     return res.status(400).json({ message: "Anime Not Found !", statuscode: 400 });
    //                 }
    //                 return anime
    //                     .update({
    //                         title: req.body.title || anime.name,
    //                         content: req.body.content || anime.nik
    //                     })
    //                     .then(() => res.json({
    //                         status: 200,
    //                         message: "Anime Successfully Updated",
    //                         data: anime
    //                     }))
    //                     .catch((error) => res.json({
    //                         status: 500,
    //                         message: "Internal Server Error",
    //                     }));
    //             })
    //             .catch((error) => res.json({
    //                 status: 500,
    //                 message: "Internal Server Error",
    //             }));
    //     }
    //     catch (error) {
    //         return res.json({
    //             status: 500,
    //             message: "Internal Server Error",
    //         });
    //     }
    // },
    // delete: async (req, res) => {
    //     return AnimeModel
    //         .findByPk(req.params.id)
    //         .then(anime => {
    //             if (!anime) {
    //                 return res.status(400).json({ message: "Anime Not Found !", statuscode: 400 });
    //             }
    //             return anime
    //                 .destroy()
    //                 .then(() => res.json({
    //                     status: 200,
    //                     message: "Anime Successfully Deleted",
    //                     data: anime
    //                 }))
    //                 .catch((error) => res.json({
    //                     status: 500,
    //                     message: "Internal Server Error",
    //                 }));
    //         })
    //         .catch((error) => res.json({
    //             status: 500,
    //             message: "Internal Server Error",
    //         }));
    // },
}