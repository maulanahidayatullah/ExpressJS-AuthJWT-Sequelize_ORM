const { AnimeModel } = require('../models');
const { KategoriModel } = require('../models');
const { AnimeKategoriModel } = require('../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
    list: async (req, res) => {
        try {
            return AnimeModel
                .findAll({
                    include: [{
                        model: KategoriModel,
                        as: 'kategori'
                    }],
                })
                .then((animes) => {
                    const data = animes.map((anime) => ({
                        title: anime.title,
                        content: anime.content,
                        kategori: anime.kategori.map((kategori) => ({
                            nama: kategori.nama,
                        })),
                    }));

                    res.json({
                        status: 200,
                        message: "Success Retrieve Data",
                        data: data
                    })
                })
                .catch((error) => {
                    console.log(error);
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
            const schema = {
                title: "string",
                content: "string",
                kategori_id: { type: 'array', items: 'number', min: 1 },
            }


            const validation = v.compile(schema)(req.body);
            if (validation !== true) {
                return res.json({
                    status: 400,
                    message: validation,
                })
            }

            return AnimeModel
                .create({
                    title: req.body.title,
                    content: req.body.content,
                })
                .then((anime) => {
                    req.body.kategori_id.forEach((kategori_id) => {
                        AnimeKategoriModel
                            .create({
                                anime_id: anime.id,
                                kategori_id: kategori_id,
                            })
                            .catch((error) => res.json({
                                error: error,
                                status: 500,
                                message: "Internal Server Error",
                            }))
                    })

                    return res.json({
                        status: 200,
                        message: "Anime Created Successfully",
                        anime: anime
                    });
                })
                .catch((error) => res.json({
                    error: error,
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
        return AnimeModel
            .findByPk(req.params.id, {
                // include: [{
                //     model: KategoriModel,
                //     as: 'kategori'
                // }],
            })
            .then((anime) => {
                if (!anime) {
                    return res.status(400).json({ message: "Anime Not Found !", statuscode: 400 });
                }
                return res.json({
                    status: 200,
                    message: "Anime Found !",
                    data: anime
                });
            })
            .catch((error) => res.json({
                status: 500,
                message: "Internal Server Error",
            }));
    },
    update: async (req, res) => {
        try {
            return AnimeModel
                .findByPk(req.params.id)
                .then(anime => {
                    if (!anime) {
                        return res.status(400).json({ message: "Anime Not Found !", statuscode: 400 });
                    }
                    return anime
                        .update({
                            title: req.body.title || anime.name,
                            content: req.body.content || anime.nik
                        })
                        .then(() => res.json({
                            status: 200,
                            message: "Anime Successfully Updated",
                            data: anime
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
        return AnimeModel
            .findByPk(req.params.id)
            .then(anime => {
                if (!anime) {
                    return res.status(400).json({ message: "Anime Not Found !", statuscode: 400 });
                }
                return anime
                    .destroy()
                    .then(() => res.json({
                        status: 200,
                        message: "Anime Successfully Deleted",
                        data: anime
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