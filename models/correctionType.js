module.exports = function(sequelize, DataTypes) {
    let CorrectionType = sequelize.define("CorrectionType", {
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    CorrectionType.associate = function(models) {
        CorrectionType.belongsTo(models.Tool1, {
            foreignKey: {
              allowNull: false
            }
        });
    };


    return CorrectionType;
  };
  