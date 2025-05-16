const express = require('express');
const router = express.Router();
const questionController = require('../Controllers/questioncontroller');

router.post('/', questionController.createQuestion);
router.get('/myquestions/:idAdmin', questionController.displayQuestionNontrait);
router.get('/ques/:id', questionController.getquestionById);
router.put('/answerQues/:id', questionController.answerQuestion);
router.put('/updateCloture/:id', questionController.updateStautCloture);
router.get('/col', questionController.getAllquestion);
router.delete('/arch/:id', questionController.archiverEtSupprimerQuestion);
router.delete('/archclo/:id', questionController.archiverEtSupprimerQuestionclo);
router.get('/archivee', questionController.getAllquestionArchive);
router.get('/getques/:idUser', questionController.getquestion);

















module.exports = router;
