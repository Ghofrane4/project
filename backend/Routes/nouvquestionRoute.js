const express = require('express');
const router = express.Router();
const nouvquestion = require('../Controllers/nouvquestion');


router.get('/getnouvques', nouvquestion.getAllQuestions);
router.post('/post', nouvquestion.sendSimpleMessage);
router.get('/nouv/:id', nouvquestion.getnouvquestionById);
router.get('/nouvQuestions/:iduser', nouvquestion.getNouvQuestionsByIdUser);

router.put('/upd/:id', nouvquestion.answernouvQuestion);




module.exports = router;
