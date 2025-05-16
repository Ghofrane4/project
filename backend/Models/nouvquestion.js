module.exports = (sequelize, DataTypes) => {
    const Nouvquestion = sequelize.define("Nouvquestion", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Assurez-vous que le modèle "Users" existe bien
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
        validate: {
          isEmail: true, 
        },
      },
      sujet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reponse: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dateC: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      },

    }, {
      tableName: "Nouvquestion", 
      timestamps: false     // Optionnel : force le nom de la table
    });
  
    return Nouvquestion;
  };
  