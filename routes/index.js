var express = require('express');
var router = express.Router();
var controller = require('../controller/usercontroller');

// admin
router.get('/',controller.select);
router.post('/admin',controller.insert);
router.post('/login',controller.login);

// subject

router.post('/subject',controller.subject_insert);
router.post('/subupdate/:id',controller.subject_update);
router.get('/subdelete/:id',controller.subject_delete);

// question
router.post('/question',controller.question_insert);
router.get('/question',controller.question_select);
router.post('/quupdate/:id',controller.question_update);
router.get('/qudelete/:id',controller.question_delete);

router.get('/questionpagination',controller.question_pagination);


// student
router.get('/student',controller.student_select);
router.post('/student',controller.student_insert);
router.post('/studlogin',controller.student_login);
router.get('/viewsubject',controller.view_subject);
router.get('/examsubject/:id',controller.exam_question);

router.post('/answer/:id',controller.ans);

router.get('/score',controller.score);
router.get('/viewstudentexam',controller.login_counter);

router.get('/studlogout',controller.student_logout);
module.exports = router;
