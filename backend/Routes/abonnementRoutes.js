const express = require('express');
const router = express.Router();
const abonnementController = require('../Controllers/abonnementController');


router.post('/', abonnementController.createAbonnement);

router.get('/', abonnementController.getAllAbonnements);

router.get('/abon/:id', abonnementController.getAbonnementById);

router.get('/client', abonnementController.getClientsAbonnement);

router.delete('/:id', abonnementController.deleteAbonnements);

router.put('/:id', abonnementController.updateAbonnement);

module.exports = router;