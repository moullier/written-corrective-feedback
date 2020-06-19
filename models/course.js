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
        Course.hasMany(models.ClassList, {
          onDelete: "cascade"
        });
      };


    return Course;
  };
  