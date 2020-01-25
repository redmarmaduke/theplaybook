module.exports = function(sequelize,Sequelize) {
    var Comment = sequelize.define('Comment', {
        text: {
            type: Sequelize.STRING,
            validate: {
                len: [ 1,140 ]
            }
        }
    });

    Comment.associate = function (models) {
        models.Comment.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });

        models.Comment.belongsTo(models.Game, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return Comment;
};