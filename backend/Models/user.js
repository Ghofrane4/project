module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'No Name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        companyFunctionality: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // companyLogo: {
        //     type: DataTypes.STRING,
        //     allowNull: true // To store the company logo URL
        // },
        // companyAddress: {
        //     type: DataTypes.TEXT,
        //     allowNull: true // Store the full address in a text field
        // }
    });

    User.associate = models => {
        // One-to-one relationship with AboutUs
        User.hasOne(models.AboutUs, {
            foreignKey: 'userId',
            as: 'aboutUs',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // One-to-one relationship with Settings
        User.hasOne(models.Settings, {
            foreignKey: 'userId',
            as: 'settings',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // One-to-one relationship with contact Info
        User.hasOne(models.ContactInformation, {
            foreignKey: 'userId',
            as: 'contactInformation',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        User.hasOne(models.SectionContent, {
            foreignKey: 'userId',
            as: 'sectionContent',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        User.hasMany(models.Service, {
            foreignKey: 'userId',
            as: 'services',
            onDelete: 'CASCADE',
        });

        User.hasMany(models.Product, {
            foreignKey: 'userId',
            as: 'products',
            onDelete: 'CASCADE',
        });
        
    };

    return User;
};
