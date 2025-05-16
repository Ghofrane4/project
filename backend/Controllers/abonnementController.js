const pool = require('../config/database');
const { Abonnement } = require("../Models");

exports.createAbonnement = async (req, res) => {
  const { nomclient, datedeb, datefin, prix } = req.body;

  if (!nomclient || !datedeb || !datefin || !prix) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const startDate = new Date(datedeb);
  const endDate = new Date(datefin);
  if (isNaN(startDate) || isNaN(endDate)) {
    return res.status(400).json({ message: 'Les dates doivent être au format YYYY-MM-DD' });
  }

  if (isNaN(prix)) {
    return res.status(400).json({ message: 'Le prix doit être un nombre valide' });
  }

  const formattedStartDate = startDate.toISOString().split('T')[0]; 
  const formattedEndDate = endDate.toISOString().split('T')[0];    

  console.log('Données à insérer :', { nomclient, formattedStartDate, formattedEndDate, prix });

  try {
    const result = await pool.query(
      `INSERT INTO abonnement (nomclient, datedeb, datefin, prix) 
       VALUES ('${nomclient}', '${formattedStartDate}', '${formattedEndDate}', ${prix})`
    );

    console.log('Résultat de l\'insertion :', result);

    const abonnementId = result[0]; 
    console.log('Abonnement ID généré :', abonnementId);

    if (!abonnementId) {
      throw new Error('L\'ID de l\'abonnement n\'a pas pu être généré.');
    }

    const clientId = abonnementId; 

    await pool.query(
      `UPDATE abonnement SET clientId = ${clientId} WHERE id = ${abonnementId}`
    );

    res.status(201).json({
      id: abonnementId, 
      clientId: clientId,
      nomclient,
      datedeb,
      datefin,
      prix
    });
  } catch (error) {
    console.error('Erreur MySQL:', error.sqlMessage || error.message || error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
 
exports.getAllAbonnements = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM abonnement');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.getAbonnementById = async (req, res) => {
  try {
    const { id } = req.params;  
    const abonnement = await Abonnement.findByPk(id);
    
    if (!abonnement) {
      return res.status(404).json({ message: 'Abonnement non trouvé' });
    }

    return res.status(200).json(abonnement);
  } catch (error) {
    
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getClientsAbonnement = async (req, res) => {
  try {
    const abonnements = await Abonnement.findAll({
      attributes: ['id', 'nomclient','datedeb','datefin','prix'] // Sélectionne uniquement les champs nécessaires
    });

    if (abonnements.length === 0) {
      return res.status(404).json({ message: "Aucun abonnement trouvé" });
    }

    res.json(abonnements);
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.deleteAbonnements = async (req, res) => {
  const { id } = req.params;

  try {
  
    const [checkResult] = await pool.query(`SELECT id FROM Abonnement WHERE id = ${id}`);
    if (checkResult.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Abonnement non trouvé' 
      });
    }

    // 💣 Supprimer les factures associées
    await pool.query(`DELETE FROM facture WHERE clientId = ${id}`);

    // 2. Supprimer l'abonnement
    await pool.query(`DELETE FROM abonnement WHERE id = ${id}`);

    // 3. Réponse OK
    res.status(200).json({
      success: true,
      message: 'Abonnement supprimé avec succès',
      deletedId: id
    });

  } catch (error) {
    console.error('Erreur MySQL:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la suppression',
      error: error.message 
    });
  }
};

exports.updateAbonnement = async (req, res) => {
  const { id } = req.params;
  const { nomclient, datedeb, datefin, prix } = req.body;

  try {
    const abonnement = await Abonnement.findByPk(id);

    if (!abonnement) {
      return res.status(404).json({ message: "Abonnement non trouvé" });
    }

    abonnement.nomclient = nomclient || abonnement.nomclient;
    abonnement.datedeb = datedeb || abonnement.datedeb;
    abonnement.datefin = datefin || abonnement.datefin;
    abonnement.prix = prix || abonnement.prix;

    const updatedAbonnement = await abonnement.save();

    return res.status(200).json(updatedAbonnement);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

