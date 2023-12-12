module.exports = (sequelize, DataTypes) => {
    const AnimeKategoriModel = sequelize.define(
        "AnimeKategoriModel",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            kategori_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'KategoriModel',
                    key: 'id',
                },
            },
            anime_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'AnimeModel',
                    key: 'id',
                },
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: "anime_kategori"
        }
    );

    // AnimeKategoriModel.associate = (models) => {
    //     AnimeKategoriModel.belongsTo(models.AnimeModel, {
    //         foreignKey: 'anime_id',
    //         as: 'kategori',
    //     });
    // };

    // AnimeKategoriModel.associate = (models) => {
    //     AnimeKategoriModel.belongsTo(models.KategoriModel, {
    //         foreignKey: 'kategori_id',
    //         as: 'kategori',
    //     });
    // };
    return AnimeKategoriModel;
}