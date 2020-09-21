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

    Assignment.associate = function(models) {
        // Associating Assigment with Tool1
        Assignment.hasOne(models.Tool1, {
          onDelete: "cascade"
        });

        Assignment.hasOne(models.Tool2, {
          onDelete: "cascade"
        });
      };


    return Assignment;
  };
  