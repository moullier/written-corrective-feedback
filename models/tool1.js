module.exports = function(sequelize, DataTypes) {
    let Tool1 = sequelize.define("Tool1", {
        dateAssigned: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });

    Tool1.associate = function(models) {
        Tool1.belongsTo(models.Assignment, {
            foreignKey: {
              allowNull: false
            }
        });
    };


    return Tool1;
  };
  