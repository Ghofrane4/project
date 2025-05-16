const pool = require('../config/database');
const { Questions } = require("../Models/");
const { Questions_archivees } = require("../Models/");

exports.createQuestion = async (req, res) => {
    const { iduser, idadmin, email ,sujet, message, priorite, societe } = req.body;
  
    if (!iduser || !idadmin || !email|| !sujet || !message  || !priorite || !societe)  {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
  
    console.log('Données à insérer :', { iduser, idadmin, email, sujet, message, priorite, societe });
  
    try {
    

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // "2025-04-18"
    console.log('Date formatée :', formattedDate);
     // DEBUG
     const statut  = "nonTrait";

     const [adminResult] = await pool.query(
      `SELECT fullname FROM superadmins WHERE id = ${idadmin}`,

    );

    if (!adminResult || adminResult.length === 0) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }

    const adminFullname = adminResult[0].fullname;
    

    
      // Insertion des données dans la table 'questions'
      const [insertResult] = await pool.query(
        `INSERT INTO questions (iduser, idadmin, email, sujet, message, statut, dateC, priorite, societe) 
         VALUES (${iduser},${idadmin},"${email}","${sujet}","${message}","${statut}","${formattedDate}","${priorite}","${societe}")` 
      );
  // Affichez tout l'objet retourné
console.log('Résultat complet de l\'insertion :', insertResult);

const questionId = insertResult;


      await pool.query(
        `INSERT INTO notifications (userId, nbreNotif, fullname, idObject) 
         VALUES (${idadmin}, 1, '${adminFullname}' , ${questionId})`
      );

      // Réponse avec l'ID généré de la question
      res.status(201).json({
        id: insertResult, // Récupérer l'ID généré
        iduser,
        idadmin,
        email,
        sujet,
        message,
        statut,
        priorite,
        societe
      });
    } catch (error) {
      // Enregistrement de l'erreur détaillée pour le débogage
      console.error('Erreur MySQL:', error.sqlMessage || error.message || error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
};
  
exports.displayQuestionNontrait = async (req, res) => {
    try {
      const { idAdmin } = req.params;
  
      const questions = await Questions.findAll({
        where: { 
          idadmin: idAdmin,
          statut: "nonTrait"
        },
        order: [['dateC', 'DESC']] // Trie les résultats par dateC (ordre décroissant)
      });
  
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: "Aucune question trouvée pour cet admin." });
      }
  
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.displayQuestionCloture = async (req, res) => {
    try {
      const { idAdmin } = req.params;
  
      const questions = await Questions.findAll({
        where: { idadmin: idAdmin ,
                 statut: "cloture"}
        
      });
  
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: "Aucune question trouvée pour cet admin." });
      }
  
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getquestionById = async (req, res) => {
    try {
      const { id } = req.params;
      const question = await Questions.findOne({
        where: { id: id },
      });
      if (question) {
        return res.status(200).json(question);
      }
      return res.status(404).json({ message: "question not found" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

exports.answerQuestion = async (req, res) => {
    const { id } = req.params;
    const { reponse } = req.body;
  
    try {
      // Vérifier si la question existe
      const question = await Questions.findByPk(id);
  
      if (!question) {
        return res.status(404).json({ message: "Question non trouvée" });
      }
  
      // Mise à jour de la réponse de la question
      question.reponse = reponse || question.reponse; // Update the instance property
  
      // Sauvegarder la question mise à jour
      const updatedQuestion = await question.save(); // Save the instance
  
      // Ajouter une notification
      const iduser = question.iduser; 
      const questionId = question.id; 

      const [userResult] = await pool.query(
        `SELECT fullname FROM users WHERE id = ${iduser}`,
  
      );
  
      if (!userResult || userResult.length === 0) {
        return res.status(404).json({ message: 'Admin non trouvé' });
      }
  
      const userFullname = userResult[0].fullname;


  
      await pool.query(
        `INSERT INTO notifications (userId, nbreNotif, fullname, idObject) 
         VALUES (${iduser}, 1, '${userFullname}', ${questionId})`
      );
  
      return res.status(200).json(updatedQuestion);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  };
  
exports.updateStautCloture = async (req, res) => {
  const { id } = req.params;
  const cloture = "cloture"; // This should be a string

  try {
    // Vérifier si la question existe
    const statut = await Questions.findByPk(id);

    if (!statut) {
      return res.status(404).json({ message: "Question non trouvée" });
    }
    
    // Mise à jour du statut de la question
    statut.statut = cloture; // Update the instance property

    // Sauvegarder la question mise à jour
    const updatedStatut = await statut.save(); // Save the instance

    return res.status(200).json(updatedStatut);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.getAllquestion = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM questions WHERE statut='cloture'");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.archiverEtSupprimerQuestion = async (req, res) => {
  const id = req.params.id;

  try {
    // 1. Récupérer la question
    const [rows] = await pool.query(`SELECT * FROM questions WHERE id = ${id}`);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Question introuvable" });
    }

    const question = rows[0];

    // 2. Construire dynamiquement la requête d'insertion
    const columns = Object.keys(question).join(', ');
    const values = Object.values(question)
      .map(value => value === null ? 'NULL' : (typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : value))
      .join(', ');

    const insertQuery = `INSERT INTO questions_archivees (${columns}) VALUES (${values})`;

    await pool.query(insertQuery);

    // 3. Supprimer
    await pool.query(`DELETE FROM questions WHERE id = ${id}`);

    res.status(200).json({ message: "Question archivée et supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'archivage/suppression", error });
  }
};

exports.getAllquestionArchive = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM questions_archivees ORDER BY dateC DESC ");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
exports.getquestion = async (req, res) => {
  try {
    const { idUser } = req.params;

    if (!Questions || !Questions_archivees) {
      return res.status(500).json({ error: "Les modèles Questions ou Questions_archivees sont manquants." });
    }

    const questionsActives = await Questions.findAll({
      where: { iduser: idUser }
    });

    const questionsArchivees = await Questions_archivees.findAll({
      where: { iduser: idUser }
    });

    // Fusionner les deux tableaux
    let toutesLesQuestions = [...questionsActives, ...questionsArchivees];

    // Trier par dateC décroissante (du plus récent au plus ancien)
    toutesLesQuestions.sort((a, b) => new Date(b.dateC) - new Date(a.dateC));

    if (toutesLesQuestions.length === 0) {
      return res.status(404).json({ message: "Aucune question trouvée pour cet utilisateur." });
    }

    res.status(200).json(toutesLesQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



exports.archiverEtSupprimerQuestionclo = async (req, res) => {
  const id = req.params.id;

  try {
    // 1. Récupérer la question avec le statut "cloture"
    const [rows] = await pool.query(`SELECT * FROM questions WHERE id = ${id} AND statut = 'cloture'`);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Question introuvable ou non clôturée" });
    }

    const question = rows[0];

    // 2. Construire dynamiquement la requête d'insertion
    const columns = Object.keys(question).join(', ');
    const values = Object.values(question)
      .map(value => value === null ? 'NULL' : (typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : value))
      .join(', ');

    const insertQuery = `INSERT INTO questions_archivees (${columns}) VALUES (${values})`;

    await pool.query(insertQuery);

    // 3. Supprimer
    await pool.query(`DELETE FROM questions WHERE id =${id}`);

    res.status(200).json({ message: "Question archivée et supprimée avec succès" });
  } catch (error) {
    console.error("Database error:", error); // Log the error for debugging
    res.status(500).json({ message: "Erreur lors de l'archivage/suppression", error: error.message });
  }
};







