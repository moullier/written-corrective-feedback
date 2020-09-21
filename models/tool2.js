module.exports = function(sequelize, DataTypes) {
    let Tool2 = sequelize.define("Tool2", {

    });

    Tool2.associate = function(models) {
        Tool2.belongsTo(models.Assignment, {
            foreignKey: {
              allowNull: false
            }
        });
    };

    return Tool2;
  };
  