// routes/factures.js
const express = require('express');
const router = express.Router();
const factureController = require('../Controllers/facturecontroller');


router.get('/', factureController.getAllFactures);
// POST - Ajouter un abonnement
router.post('/fact/:id', factureController.createfacture);

router.delete('/:id', factureController.deletefacture);

 router.get('/fac/:id', factureController.getfactureById);

 router.put('/upd/:id', factureController.updateFacture);


module.exports = router;
