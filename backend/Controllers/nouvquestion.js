const pool = require('../config/database');
const {Nouvquestion} = require("../Models/");

exports.getAllQuestions= async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM nouvquestion ORDER BY dateC DESC');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  };

exports.getNouvQuestionsByIdUser = async (req, res) => {
  try {
    const { iduser } = req.params;
    const nouvquestion = await Nouvquestion.findAll({
      where: { iduser: iduser },
      order: [['dateC', 'DESC']], // Trie par dateC décroissante
    });

    if (nouvquestion) {
      return res.status(200).json(nouvquestion);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



exports.sendSimpleMessage = async (req, res) => {
    const { iduser, idadmin, email, sujet, message } = req.body;
  
    if (!iduser || !idadmin || !email || !sujet || !message) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    console.log('Données à insérer :', { iduser, idadmin, email, sujet, message });
  
    try {
      // Requête SQL sécurisée avec des paramètres
      const [result] = await pool.query(
        `INSERT INTO nouvquestion (iduser, idadmin, email, sujet, message) VALUES (${iduser},${idadmin},"${email}","${sujet}","${message}")`,
   
      );
  
      console.log('Résultat de l\'insertion :', result);
  
      res.status(201).json({
        id: result.insertId,
        iduser,
        idadmin,
        email,
        sujet,
        message,
      });
    } catch (error) {
      console.error('Erreur MySQL:', error.sqlMessage || error.message || error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };

exports.getnouvquestionById= async (req, res) => {
    try {
      const { id } = req.params;
      const nouvquestion = await Nouvquestion.findOne({
        where: { id: id },
      });
      if (nouvquestion) {
        return res.status(200).json(nouvquestion);
      }
      return res.status(404).json({ message: "nouvquestion not found" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


exports.answernouvQuestion = async (req, res) => {
    const { id } = req.params;
    const { reponse } = req.body;
  
    try {
      // Vérifier si la question existe
      const nouvquestion = await Nouvquestion.findByPk(id);
  
      if (!nouvquestion) {
        return res.status(404).json({ message: "Question non trouvée" });
      }
  
      // Mise à jour de la réponse
      nouvquestion.reponse = reponse;
  
      // Sauvegarder la modification
      const updatednouvQuestion = await nouvquestion.save();
  
      return res.status(200).json({
        message: "Réponse mise à jour avec succès",
        data: updatednouvQuestion
      });
  
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réponse :", error);
      return res.status(500).json({
        message: "Erreur serveur",
        error: error.message || error
      });
    }
  };
  