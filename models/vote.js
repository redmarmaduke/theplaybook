module.exports = function (sequelize, Sequelize) {
    var Vote = sequelize.define('Vote', {
        score: Sequelize.INTEGER
    });

    Vote.associate = function (models) {
        models.Vote.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });

        models.Vote.belongsTo(models.Game, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Vote;
};