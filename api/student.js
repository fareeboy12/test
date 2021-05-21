const router = require('express').Router()
const Controller = require('../controllers');

router.get('/', Controller.Student.getStudent);
router.get('/:regno', Controller.Student.getStudentByRegNo);


module.exports = router;