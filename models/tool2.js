module.exports = function(sequelize, DataTypes) {
    let Tool2 = sequelize.define("Tool2", {
        // step 1 dates:
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
        // step 4 dates:
        expectationsDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // step 5 dates:
        responseDueDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        responseReturnDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // step 6 dates:
        peerWCFDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // has tool been finished?
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        studentProficiencyLevel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        directnessLevel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expectationsSet: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expectationsHow: {
            type: DataTypes.STRING,
            allowNull: true
        },
        studentResponseAssignment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Tool2.associate = function(models) {
        Tool2.belongsTo(models.Assignment, {
            foreignKey: {
              allowNull: false
            }
        });
    };

    return Tool2;
  };
  