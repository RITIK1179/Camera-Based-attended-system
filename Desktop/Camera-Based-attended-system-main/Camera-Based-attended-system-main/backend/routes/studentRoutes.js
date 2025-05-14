const express = require('express');
const { getStudentDetails, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

router.get('/studentDetail', getStudentDetails);
router.delete('/studentDel/:id', deleteStudent);

module.exports = router;
