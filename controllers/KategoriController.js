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
    create: async (req, res) => {
        try {
            const rule = {
                nama: "string",
            }

            const validate = v.validate(req.body, rule);
            if (validate.length) {
                return res.json({
                    status: 500,
                    message: "Internal Server Error",
                })
            }

            return KategoriModel
                .create({
                    nama: req.body.nama,
                })
                .then((kategori) => res.json({
                    status: 200,
                    message: "Created Successfully",
                    data: kategori
                }))
                .catch((error) => res.json({
                    status: 500,
                    message: "Internal Server Error",
                }));
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    },

    getById: async (req, res) => {
        return KategoriModel
            .findByPk(req.params.id, {
                // include: [{
                //     model: AnimeModel,
                //     as: 'anime'
                // }],
            })
            .then((kategori) => {
                if (!kategori) {
                    return res.status(400).json({ message: "Kategori Not Found !", statuscode: 400 });
                }
                return res.json({
                    status: 200,
                    message: "Data Found !",
                    data: kategori
                });
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    status: 500,
                    message: "Internal Server Error",
                })
            });
    },
    update: async (req, res) => {
        try {
            return KategoriModel
                .findByPk(req.params.id)
                .then(kategori => {
                    if (!kategori) {
                        return res.status(400).json({ message: "Kategori Not Found !", statuscode: 400 });
                    }
                    return kategori
                        .update({
                            nama: req.body.nama || kategori.nama
                        })
                        .then(() => res.json({
                            status: 200,
                            message: "Data Successfully Updated",
                            data: kategori
                        }))
                        .catch((error) => res.json({
                            status: 500,
                            message: "Internal Server Error",
                        }));
                })
                .catch((error) => res.json({
                    status: 500,
                    message: "Internal Server Error",
                }));
        }
        catch (error) {
            return res.json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    },
    delete: async (req, res) => {
        return KategoriModel
            .findByPk(req.params.id)
            .then(kategori => {
                if (!kategori) {
                    return res.status(400).json({ message: "Kategori Not Found !", statuscode: 400 });
                }
                return kategori
                    .destroy()
                    .then(() => res.json({
                        status: 200,
                        message: "Kategori Successfully Deleted",
                        data: kategori
                    }))
                    .catch((error) => res.json({
                        status: 500,
                        message: "Internal Server Error",
                    }));
            })
            .catch((error) => res.json({
                status: 500,
                message: "Internal Server Error",
            }));
    },
}