module.exports = (sequelize, DataTypes) => {
    const KategoriModel = sequelize.define(
        "KategoriModel",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nama: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: "kategori"
        }
    );

    KategoriModel.associate = (models) => {
        KategoriModel.hasMany(models.AnimeModel, {
            foreignKey: 'kategori_id',
            as: 'anime',
        });
    };

    return KategoriModel;
}

