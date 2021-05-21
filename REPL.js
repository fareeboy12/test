const mongoose = require('mongoose');
const db = require('./models');

db.Registration.find().then(res => console.log(res))

// db.Registration.aggregate([
//     { $match : { regno : '1112101', gradeid: { $ne: null } } },
//     { $lookup: { from: 'courses', localField: 'courseid',  foreignField: 'courseid', as: 'course'}}, 
//     { $unwind : "$course" }, 
//     { $lookup: { from: 'grades', localField: 'gradeid',  foreignField: 'gradeid', as: 'grade'}},
//     { $unwind: "$grade" },
//     { $group: {_id: null, tcr: { $sum: "$course.crhr"}, tgpa: { $sum: { $multiply: ["$course.crhr", "$grade.gpa"]}}}},
//     { $project: {_id: 0, gpa: {$divide: ["$tgpa", "$tcr"]}}}
// ])
// .then(res => {
//     console.log(JSON.stringify(res, null, '\t'));
//     process.exit();
// })