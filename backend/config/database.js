const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Adjust the path as needed

// Get the environment from process.env or default to 'development'
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize with logging enabled
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: console.log, // Enable query logging

    
});

// sequelize.authenticate()
//   .then(() => console.log("✅ Connexion réussie à MySQL"))
//   .catch(err => console.error("❌ Erreur de connexion :", err));



module.exports = sequelize;
