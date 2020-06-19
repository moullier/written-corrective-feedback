module.exports = function(sequelize, DataTypes) {
    let ClassList = sequelize.define("ClassList", {
        time_period: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    ClassList.associate = function(models) {
        ClassList.belongsTo(models.Course, {
            foreignKey: {
              allowNull: false
            }
        });
    };

    ClassList.associate = function(models) {
        // Associating Assigment with ClassList
        // When a ClassList is deleted, also delete any associated Assigments
        ClassList.hasMany(models.Assignment, {
          onDelete: "cascade"
        });
      };


    return ClassList;
  };
  