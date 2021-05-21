const router = require("express").Router();
const Controller = require("../controllers");

router.get("/grades", Controller.Course.getAllGrades);

module.exports = router;
