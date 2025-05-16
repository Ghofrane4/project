module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',  // Assure-toi que ce modèle est bien défini
          key: 'id',
        },
      }, 
      nbreNotif: {
        type:  DataTypes.INTEGER,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idObject: {
        type:  DataTypes.INTEGER,
        allowNull: false,
      }
    },
     {
      timestamps: false, // ceci désactive createdAt et updatedAt
    });
  
    return Notification;
  };
  