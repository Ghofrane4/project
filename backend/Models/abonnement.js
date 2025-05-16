module.exports = (sequelize, DataTypes) => {
    const Abonnement = sequelize.define('Abonnement', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      clientid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',  // Assure-toi que ce modèle est bien défini
          key: 'id',
        },
      }, 
      nomclient: {
        type: DataTypes.STRING,
        allowNull: false
      },  
      datedeb: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      datefin: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      }
    }, {
      timestamps: false, 
      freezeTableName: true 
    });
  
    return Abonnement;
  };
  