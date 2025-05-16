// models/facture.js
module.exports = (sequelize, DataTypes) => {
  const Facture = sequelize.define('Facture', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',  // Assure-toi que ce modèle est bien défini
        key: 'id',
      },
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_debut: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    date_fin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    prix: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

  }, {
    timestamps: false,
    freezeTableName: true,
  });


  return Facture;
};
