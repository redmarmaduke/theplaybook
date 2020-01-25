module.exports = function(sequelize,Sequelize) {
    var Game = sequelize.define('Game', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        releaseDate: Sequelize.DATEONLY,
        hype: Sequelize.INTEGER
    });

    Game.associate = function (models) {
        models.Game.hasMany(models.Comment);
        models.Game.hasMany(models.Vote);
    };
    return Game;
};