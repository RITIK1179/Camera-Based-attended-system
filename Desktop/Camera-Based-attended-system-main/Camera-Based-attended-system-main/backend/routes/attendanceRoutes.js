const express = require('express');
const { markAttendance, getDashboard } = require('../controllers/attendanceController');

const router = express.Router();

router.get('/roll/:id', markAttendance);
router.get('/dash', getDashboard);

module.exports = router;
