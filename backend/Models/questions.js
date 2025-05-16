// models/product.js
module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    idadmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sujet: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reponse: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateC: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    priorite: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    societe: {
      type: DataTypes.STRING,
      allowNull: true,
    },


  }, {
    timestamps: false, // ceci désactive createdAt et updatedAt
  });


  return Questions;
};
