const db = require('../models');

exports.getStudentByRegNo = (req, res) => {
    db.Student.find({ regno: req.params.regno })
    .then(student => res.status(200).json(student[0]));    
}

exports.getStudent = (req, res) => {
    db.Student.find()
    .then(student => res.status(200).json(student[0]));    
}