module.exports = function(sequelize,Sequelize) {
    var Genre = sequelize.define('Genre', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },{
        timestamps: false
    });

    Genre.associate = function (models) {
        models.Genre.belongsToMany(models.Game, { through: 'GameGenre', timestamps: false });
    };
    return Genre;
};