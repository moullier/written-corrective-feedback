module.exports = function(sequelize, DataTypes) {
    let CorrectionType = sequelize.define("CorrectionType", {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
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
  