module.exports = (sequelize, DataTypes) => {
    const AnimeModel = sequelize.define(
        "AnimeModel",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            content: {
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
            tableName: "anime"
        }
    );

    AnimeModel.associate = (models) => {
        AnimeModel.belongsToMany(models.KategoriModel, {
            through: 'anime_kategori',
            foreignKey: 'anime_id',
            as: 'kategori',
        });
    };

    return AnimeModel;
}