module.exports = function(sequelize, DataTypes) {
    let Assignment = sequelize.define("Assignment", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
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
  