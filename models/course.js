module.exports = function(sequelize, DataTypes) {
    let Course = sequelize.define("Course", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Course.associate = function(models) {
        Course.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
        });
    };

    Course.associate = function(models) {
        // Associating Assigment with ClassList
        // When a ClassList is deleted, also delete any associated Assigments
        Course.hasMany(models.ClassList, {
          onDelete: "cascade"
        });
      };


    return Course;
  };
  