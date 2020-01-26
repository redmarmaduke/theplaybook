module.exports = function(sequelize,Sequelize) {
    var Game = sequelize.define('Game', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        releaseDate: Sequelize.DATEONLY,
        hype: Sequelize.INTEGER
    }, {
        timestamps: false
    });

    Game.associate = function (models) {
        models.Game.hasMany(models.Comment);
        models.Game.hasMany(models.Vote);
        models.Game.belongsToMany(models.Genre, { through: 'GameGenre', timestamps: false });
    };
    return Game;
};