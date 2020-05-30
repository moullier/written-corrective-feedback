module.exports = function(sequelize, DataTypes) {
    let ClassList = sequelize.define("ClassList", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time_period: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    ClassList.associate = function(models) {
        ClassList.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
        });
    };


    return ClassList;
  };
  