module.exports = function(sequelize,Sequelize) {
    var User = sequelize.define('User', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true 
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false 
        }
    },{
        timestamps: false
    });

    User.associate = function (models) {
        models.User.hasMany(models.Comment);
        models.User.hasMany(models.Vote);
    };

    return User;
};