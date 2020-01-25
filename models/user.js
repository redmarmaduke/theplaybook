module.exports = function(sequelize,Sequelize) {
    var User = sequelize.define('User', {
        username: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false 
        }
    });

    User.associate = function (models) {
        models.User.hasMany(models.Comment);
        models.User.hasMany(models.Vote);
    };

    return User;
};