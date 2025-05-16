module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("Contact", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        socialMedia: {
            type: DataTypes.JSON, // JSON to store multiple social media links
            allowNull: true
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });

    return Contact;
};
