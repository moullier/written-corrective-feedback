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
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Tool1.associate = function(models) {
        Tool1.belongsTo(models.Assignment, {
            foreignKey: {
              allowNull: false
            }
        });
    };

    Tool1.associate = function(models) {
        Tool1.hasMany(models.CorrectionType, {
          onDelete: "cascade"
        });
      };


    return Tool1;
  };
  