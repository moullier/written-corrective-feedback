module.exports = function(sequelize, DataTypes) {
    let Assignment = sequelize.define("Assignment", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Assignment.associate = function(models) {
        Assignment.belongsTo(models.ClassList, {
            foreignKey: {
              allowNull: false
            }
        });
    };


    return Assignment;
  };
  