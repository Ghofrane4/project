const pool = require('../config/database');
const { Facture } = require("../Models");

exports.getAllFactures= async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM facture');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.createfacture = async (req, res) => {
  const {  numero, date, adresse, date_debut, date_fin,prix } = req.body;

  if (!numero || !date || !adresse || !date_debut|| !date_fin|| !prix ) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const endDate = new Date(date);
  const debDate = new Date(date_debut);
  const finDate = new Date(date_fin);
  const clientId = req.params.id; 
  
  // Check if the date is valid
  if (isNaN(endDate) && isNaN(debDate) && isNaN(finDate) ) {
    return res.status(400).json({ message: 'Les dates doivent être au format YYYY-MM-DD' });
  }

  // Format the date to 'YYYY-MM-DD' for MySQL
  const formattedDate = endDate.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
  const formattedDate1 = debDate.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
  const formattedDate2 = finDate.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

  console.log('Données à insérer :', { clientId, numero, formattedDate, adresse,formattedDate1,formattedDate2,prix });

  try {
    // Insertion des données dans la table 'facture'
    const result = await pool.query(
      `INSERT INTO facture (clientId, numero, date, adresse, date_debut, date_fin, prix) 
       VALUES ('${clientId}', '${numero}', '${formattedDate}', '${adresse}','${formattedDate1}','${formattedDate2}','${prix}')`
    );

    // Réponse avec l'ID généré de la facture
    res.status(201).json({
      id: result[0].insertId, // Récupérer l'ID généré
      clientId,
      numero,
      date: formattedDate,
      adresse,
      date_debut: formattedDate1,
      date_fin: formattedDate2,
      prix

    });
  } catch (error) {
    // Enregistrement de l'erreur détaillée pour le débogage
    console.error('Erreur MySQL:', error.sqlMessage || error.message || error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.deletefacture = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Vérifier si l'abonnement existe
    const [checkResult] = await pool.query(`SELECT id FROM facture WHERE id = ${id}`);
    if (checkResult.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'facture non trouvé' 
      });
    }

    // 💣 Supprimer les factures associées
    await pool.query(`DELETE FROM facture WHERE clientId = ${id}`);

    // 2. Supprimer l'abonnement
    await pool.query(`DELETE FROM facture WHERE id = ${id}`);

    // 3. Réponse OK
    res.status(200).json({
      success: true,
      message: 'facture supprimé avec succès',
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

exports.getfactureById = async (req, res) => {
  try {
    const { id } = req.params;  // Récupère l'ID de l'facture à partir des paramètres de la requête
    
    // Recherche la facture par son ID
    const facture = await Facture.findByPk(id);
    
    // Si l'facture n'existe pas
    if (!facture) {
      return res.status(404).json({ message: 'facture non trouvé' });
    }

    // Si facture est trouvé, on le renvoie
    return res.status(200).json(facture);
  } catch (error) {
    // Si une erreur se produit, on renvoie un message d'erreur
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateFacture = async (req, res) => {
  const { id } = req.params;
  const { numero, date, adresse, date_debut, date_fin, prix } = req.body;

  try {
    // Vérifier si l'abonnement existe
    const facture = await Facture.findByPk(id);

    if (!facture) {
      return res.status(404).json({ message: "facture non trouvé" });
    }

    // Mise à jour des informations de l'abonnement
    facture.numero = numero || facture.numero;
    facture.date = date || facture.date;
    facture.adresse = adresse || facture.adresse;
    facture.date_debut = date_debut || facture.date_debut;
    facture.date_fin = date_fin || facture.date_fin;
    facture.date_prix = prix || facture.prix;

    // Sauvegarder l'abonnement mis à jour
    const updatedFacture = await facture.save();

    return res.status(200).json(updatedFacture);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};