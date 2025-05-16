// models/History.js
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      timestamps: false,
    });
  
    return History;
  };
  